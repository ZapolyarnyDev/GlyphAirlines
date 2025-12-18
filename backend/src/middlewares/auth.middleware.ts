import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../errors/ApiError.ts";
import { isTokenRevoked } from "../repositories/token.repository.ts";

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface AuthRequest extends Request {
    user?: {
        userId: number;
        role: string;
    };
}

export async function auth(
    req: AuthRequest,
    _res: Response,
    next: NextFunction
): Promise<void> {
    const header = req.headers.authorization;
    if (!header) throw new ApiError(401, "Unauthorized");

    const token = header.split(" ")[1];
    if (!token) throw new ApiError(401, "Unauthorized");

    if (await isTokenRevoked(token)) {
        throw new ApiError(401, "Token revoked");
    }

    const payload = jwt.verify(token, JWT_SECRET) as {
        userId: number;
        role: string;
    };

    req.user = payload;
    next();
}

export function requireRole(role: "admin" | "user") {
    return (req: AuthRequest, _res: Response, next: NextFunction) => {
        if (!req.user || req.user.role !== role) {
            throw new ApiError(403, "Forbidden");
        }
        next();
    };
}
