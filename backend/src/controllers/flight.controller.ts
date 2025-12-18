import { Request, Response } from "express";
import { findFlights } from "../services/flight.service.ts";

/**
 * GET /api/v1/flights/search
 * Поиск рейсов
 * query: origin, destination, date
 */
export async function searchFlights(
    req: Request,
    res: Response
): Promise<void> {
    const { origin, destination, date } = req.query;

    if (
        typeof origin !== "string" ||
        typeof destination !== "string" ||
        typeof date !== "string"
    ) {
        res.status(400).json({
            message: "origin, destination and date query parameters are required",
        });
        return;
    }

    try {
        const flights = await findFlights(
            origin.toUpperCase(),
            destination.toUpperCase(),
            date
        );

        res.status(200).json(flights);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
            return;
        }

        console.error("Error searching flights:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
