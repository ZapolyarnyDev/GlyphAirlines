import { Response } from "express";
import { ApiError } from "../errors/ApiError.ts";
import { AuthRequest } from "../middlewares/auth.middleware.ts";
import { createBookingTransaction } from "../services/booking.service.ts";

export async function createBooking(
    req: AuthRequest,
    res: Response
): Promise<void> {
    if (!req.user) throw new ApiError(401, "Unauthorized");

    const result = await createBookingTransaction(req.user.userId, req.body);
    res.status(201).json(result);
}
