import { db } from "../config/db.config.ts";
import { Profile } from "../models/profile.model.ts";

export async function createProfile(
    userId: number,
    firstName: string,
    lastName: string,
    middleName: string | null,
    birthday: string
): Promise<Profile> {
    const { rows } = await db.query<Profile>(
        `INSERT INTO profile (user_id, first_name, last_name, middle_name, birthday)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
        [userId, firstName, lastName, middleName, birthday]
    );
    return rows[0];
}
