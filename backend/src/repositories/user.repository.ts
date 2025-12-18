import { db } from "../config/db.config.ts";
import { User } from "../models/user.model.ts";

export async function findByEmail(email: string): Promise<User | null> {
    const { rows } = await db.query<User>(
        "SELECT id, email, password, role FROM users WHERE email = $1",
        [email]
    );
    return rows[0] ?? null;
}

export async function createUser(
    email: string,
    password: string,
    role: "user" | "admin"
): Promise<User> {
    const { rows } = await db.query<User>(
        "INSERT INTO users (email, password, role) VALUES ($1,$2,$3) RETURNING id,email,password,role",
        [email, password, role]
    );
    return rows[0];
}

export async function findById(id: number): Promise<User | null> {
    const { rows } = await db.query<User>(
        "SELECT id, email, password, role FROM users WHERE id = $1",
        [id]
    );
    return rows[0] ?? null;
}
