import { PoolClient } from "pg";

export interface BookingRow {
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
): Promise<BookingRow> {
    const { rows } = await client.query<BookingRow>(
        `INSERT INTO bookings (booking_date, user_id, total_amount, status)
     VALUES (NOW(), $1, $2, $3)
     RETURNING id, booking_date, user_id, total_amount, status`,
        [userId, totalAmount, status]
    );

    return rows[0];
}
