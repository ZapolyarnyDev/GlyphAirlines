import { db } from "../config/db.config.ts";

export async function revokeToken(
    token: string,
    expiresAt: Date
): Promise<void> {
    await db.query(
        "INSERT INTO revoked_tokens (token, expires_at) VALUES ($1, $2)",
        [token, expiresAt]
    );
}

export async function isTokenRevoked(token: string): Promise<boolean> {
    const { rows } = await db.query(
        "SELECT 1 FROM revoked_tokens WHERE token = $1 LIMIT 1",
        [token]
    );
    return rows.length > 0;
}
