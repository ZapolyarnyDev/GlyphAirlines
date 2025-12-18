import { db } from "../config/db.config.ts";
import { ApiError } from "../errors/ApiError.ts";
import * as bookingRepo from "../repositories/booking.repository.ts";
import * as ticketRepo from "../repositories/ticket.repository.ts";
import { findScheduleById } from "../repositories/schedule.repository.ts";
import { createBooking } from "../repositories/booking.repository.ts";
import {
    countTicketsBySchedule,
    createTicket,
    getTakenSeats,
    TicketRow,
} from "../repositories/ticket.repository.ts";

export interface CreateBookingPassengerInput {
    passengerId: number;
    seat?: string;
    price?: string;
}

export interface CreateBookingInput {
    scheduleId: number;
    passengers: CreateBookingPassengerInput[];
}

export interface BookingResult {
    booking: {
        id: number;
        userId: number;
        totalAmount: string;
        status: string;
    };
    tickets: TicketRow[];
}

function isSeatFormatValid(seat: string): boolean {
    return /^[1-9]\d{0,2}[A-Z]$/.test(seat);
}

function pickNextFreeSeat(taken: Set<string>, maxSeats: number): string | null {
    const letters = ["A", "B", "C", "D", "E", "F"];
    const maxRows = Math.ceil(maxSeats / letters.length);

    let used = 0;
    for (let row = 1; row <= maxRows; row++) {
        for (const letter of letters) {
            const seat = `${row}${letter}`;
            used++;
            if (used > maxSeats) return null;
            if (!taken.has(seat)) return seat;
        }
    }
    return null;
}

export async function createBookingTransaction(
    userId: number,
    input: CreateBookingInput
): Promise<BookingResult> {
    if (!Number.isFinite(input.scheduleId) || input.scheduleId <= 0) {
        throw new ApiError(400, "Invalid scheduleId");
    }

    if (!Array.isArray(input.passengers) || input.passengers.length === 0) {
        throw new ApiError(400, "Passengers are required");
    }

    for (const p of input.passengers) {
        if (!Number.isFinite(p.passengerId) || p.passengerId <= 0) {
            throw new ApiError(400, "Invalid passengerId");
        }
        if (p.seat && !isSeatFormatValid(p.seat)) {
            throw new ApiError(400, "Invalid seat format");
        }
        if (p.price && !/^\d+(\.\d{1,2})?$/.test(p.price)) {
            throw new ApiError(400, "Invalid price format");
        }
    }

    const maxSeats = process.env.SCHEDULE_MAX_SEATS
        ? Number(process.env.SCHEDULE_MAX_SEATS)
        : 180;

    const client = await db.pool.connect();

    try {
        await client.query("BEGIN");

        const schedule = await findScheduleById(client, input.scheduleId);
        if (!schedule) throw new ApiError(404, "Schedule not found");

        if (schedule.status && schedule.status.toLowerCase() === "cancelled") {
            throw new ApiError(409, "Schedule is cancelled");
        }

        const alreadyBooked = await countTicketsBySchedule(client, input.scheduleId);
        const requested = input.passengers.length;

        if (alreadyBooked + requested > maxSeats) {
            throw new ApiError(409, "Not enough seats available");
        }

        const takenSeats = await getTakenSeats(client, input.scheduleId);

        const normalizedSeats = new Set<string>();
        for (const p of input.passengers) {
            if (!p.seat) continue;
            const s = p.seat.toUpperCase();
            if (takenSeats.has(s)) throw new ApiError(409, `Seat ${s} is already taken`);
            if (normalizedSeats.has(s)) throw new ApiError(400, `Duplicate seat ${s}`);
            normalizedSeats.add(s);
        }

        const prices: string[] = input.passengers.map((p) => p.price ?? "0.00");
        const total = prices
            .reduce((acc, v) => acc + Number(v), 0)
            .toFixed(2);

        const booking = await createBooking(client, userId, total, "CONFIRMED");

        const tickets: TicketRow[] = [];
        for (const p of input.passengers) {
            let seat = p.seat?.toUpperCase();

            if (!seat) {
                const next = pickNextFreeSeat(takenSeats, maxSeats);
                if (!next) throw new ApiError(409, "Not enough seats available");
                seat = next;
            }

            if (takenSeats.has(seat)) throw new ApiError(409, `Seat ${seat} is already taken`);
            takenSeats.add(seat);

            const ticket = await createTicket(client, {
                bookingId: booking.id,
                scheduleId: input.scheduleId,
                passengerId: p.passengerId,
                seat,
                price: (p.price ?? "0.00").toString(),
            });

            tickets.push(ticket);
        }

        await client.query("COMMIT");

        return {
            booking: {
                id: booking.id,
                userId: booking.user_id,
                totalAmount: booking.total_amount,
                status: booking.status,
            },
            tickets,
        };
    } catch (e) {
        await client.query("ROLLBACK");
        throw e;
    } finally {
        client.release();
    }
}

export async function getMyBookings(userId: number) {
    return bookingRepo.findByUserId(userId);
}

export async function getMyBookingById(
    userId: number,
    bookingId: number
) {
    if (!Number.isFinite(bookingId)) {
        throw new ApiError(400, "Invalid booking id");
    }

    const booking = await bookingRepo.findById(bookingId);
    if (!booking) throw new ApiError(404, "Booking not found");
    if (booking.user_id !== userId) throw new ApiError(403, "Forbidden");

    const tickets = await ticketRepo.findByBookingId(bookingId);

    return { booking, tickets };
}

export async function cancelMyBooking(
    userId: number,
    bookingId: number
): Promise<void> {
    if (!Number.isFinite(bookingId)) {
        throw new ApiError(400, "Invalid booking id");
    }

    const booking = await bookingRepo.findById(bookingId);
    if (!booking) throw new ApiError(404, "Booking not found");
    if (booking.user_id !== userId) throw new ApiError(403, "Forbidden");
    if (booking.status === "CANCELLED") return;

    const client = await db.pool.connect();
    try {
        await client.query("BEGIN");
        await bookingRepo.cancelBooking(client, bookingId);
        await client.query("COMMIT");
    } catch (e) {
        await client.query("ROLLBACK");
        throw e;
    } finally {
        client.release();
    }
}
