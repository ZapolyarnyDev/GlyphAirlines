import {PoolClient, Submittable} from "pg";
import { db } from "../config/db.config.ts";

export interface Booking extends Submittable{
    id: number;
    booking_date: string;
    user_id: number;
    total_amount: string;
    status: string;
}

export async function createBooking(
    client: PoolClient,
    userId: number,
    totalAmount: string,
    status: string
): Promise<Booking> {
    const { rows } = await client.query<Booking>(
        `INSERT INTO bookings (booking_date, user_id, total_amount, status)
     VALUES (NOW(), $1, $2, $3)
     RETURNING id, booking_date, user_id, total_amount, status`,
        [userId, totalAmount, status]
    );

    return rows[0];
}

export async function findByUserId(userId: number): Promise<Booking[]> {
    const { rows } = await db.query<Booking>(
        `SELECT id, booking_date, user_id, total_amount, status
     FROM bookings
     WHERE user_id = $1
     ORDER BY booking_date DESC`,
        [userId]
    );

    return rows;
}

export async function findById(bookingId: number): Promise<Booking | null> {
    const { rows } = await db.query<Booking>(
        `SELECT id, booking_date, user_id, total_amount, status
     FROM bookings
     WHERE id = $1`,
        [bookingId]
    );

    return rows[0] ?? null;
}

export async function cancelBooking(
    client: PoolClient,
    bookingId: number
): Promise<void> {
    await client.query(
        "UPDATE bookings SET status = 'CANCELLED' WHERE id = $1",
        [bookingId]
    );
}
