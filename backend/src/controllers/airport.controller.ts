import { Request, Response } from "express";
import {
    getAllAirports,
    getAirportDetails,
} from "../services/airport.service.ts";

/**
 * GET /api/v1/airports
 * Получить список всех аэропортов.
 */
export async function getAirports(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const airports = await getAllAirports();
        res.status(200).json(airports);
    } catch (error) {
        console.error("Error fetching airports:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * GET /api/v1/airports/:identifier
 * Получить детали аэропорта по ID или коду IATA.
 */
export async function getAirportByIdentifier(
    req: Request,
    res: Response
): Promise<void> {
    const { identifier } = req.params;

    try {
        const airport = await getAirportDetails(identifier);

        if (!airport) {
            res.status(404).json({ message: "Airport not found" });
            return;
        }

        res.status(200).json(airport);
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.includes("Invalid airport identifier")
        ) {
            res.status(400).json({ message: error.message });
            return;
        }

        console.error("Error fetching airport details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
