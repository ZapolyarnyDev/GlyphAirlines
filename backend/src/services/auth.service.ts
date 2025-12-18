import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../errors/ApiError.ts";
import * as userRepo from "../repositories/user.repository.ts";
import * as profileRepo from "../repositories/profile.repository.ts";
import { revokeToken } from "../repositories/token.repository.ts";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    birthday: string;
}) {
    const exists = await userRepo.findByEmail(data.email);
    if (exists) throw new ApiError(409, "User already exists");

    const hash = await bcrypt.hash(data.password, 10);
    const user = await userRepo.createUser(data.email, hash, "user");

    await profileRepo.createProfile(
        user.id,
        data.firstName,
        data.lastName,
        data.middleName ?? null,
        data.birthday
    );

    const token = jwt.sign(
        { userId: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" }
    );

    return { token };
}

export async function login(email: string, password: string) {
    const user = await userRepo.findByEmail(email);
    if (!user) throw new ApiError(401, "Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new ApiError(401, "Invalid credentials");

    const token = jwt.sign(
        { userId: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" }
    );

    return { token };
}

export async function logout(token: string): Promise<void> {
    const decoded = jwt.decode(token) as JwtPayload | null;
    if (!decoded || !decoded.exp) return;

    const expiresAt = new Date(decoded.exp * 1000);
    await revokeToken(token, expiresAt);
}
