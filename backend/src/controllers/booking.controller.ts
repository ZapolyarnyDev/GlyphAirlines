import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.ts";
import {
    createBookingTransaction,
} from "../services/booking.service.ts";
import {
    getMyBookings,
    getMyBookingById,
    cancelMyBooking,
} from "../services/booking.service.ts";
import { ApiError } from "../errors/ApiError.ts";

export async function createBooking(
    req: AuthRequest,
    res: Response
): Promise<void> {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const result = await createBookingTransaction(
        req.user.userId,
        req.body
    );
    res.status(201).json(result);
}

export async function getMyBookingsController(
    req: AuthRequest,
    res: Response
): Promise<void> {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const bookings = await getMyBookings(req.user.userId);
    res.status(200).json(bookings);
}

export async function getMyBookingByIdController(
    req: AuthRequest,
    res: Response
): Promise<void> {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const bookingId = Number(req.params.id);
    const data = await getMyBookingById(req.user.userId, bookingId);
    res.status(200).json(data);
}

export async function cancelMyBookingController(
    req: AuthRequest,
    res: Response
): Promise<void> {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const bookingId = Number(req.params.id);
    await cancelMyBooking(req.user.userId, bookingId);
    res.status(204).send();
}
