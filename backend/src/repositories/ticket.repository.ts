import {PoolClient, Submittable} from "pg";
import { db } from "../config/db.config.ts";

export interface TicketRow extends Submittable {
    id: number;
    booking_id: number;
    schedule_id: number;
    passenger_id: number;
    seat: string;
    price: string;
}

export async function findByBookingId(
    bookingId: number
): Promise<TicketRow[]> {
    const { rows } = await db.query<TicketRow>(
        `SELECT id, booking_id, schedule_id, passenger_id, seat, price
     FROM tickets
     WHERE booking_id = $1`,
        [bookingId]
    );
    return rows;
}

export async function countTicketsBySchedule(
    client: PoolClient,
    scheduleId: number
): Promise<number> {
    const { rows } = await client.query<{ count: string }>(
        "SELECT COUNT(*)::text AS count FROM tickets WHERE schedule_id = $1",
        [scheduleId]
    );
    return Number(rows[0]?.count ?? 0);
}

export async function getTakenSeats(
    client: PoolClient,
    scheduleId: number
): Promise<Set<string>> {
    const { rows } = await client.query<{ seat: string }>(
        "SELECT seat FROM tickets WHERE schedule_id = $1",
        [scheduleId]
    );
    return new Set(rows.map((r) => r.seat));
}

export async function createTicket(
    client: PoolClient,
    data: {
        bookingId: number;
        scheduleId: number;
        passengerId: number;
        seat: string;
        price: string;
    }
): Promise<TicketRow> {
    const { rows } = await client.query<TicketRow>(
        `INSERT INTO tickets (booking_id, schedule_id, passenger_id, seat, price)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, booking_id, schedule_id, passenger_id, seat, price`,
        [data.bookingId, data.scheduleId, data.passengerId, data.seat, data.price]
    );
    return rows[0];
}
