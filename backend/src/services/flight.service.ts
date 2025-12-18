import {
    searchFlights,
    FlightSearchResult,
} from "../repositories/flight.repository.ts";

/**
 * Результат рейса с бизнес-данными
 */
export interface FlightWithDetails extends FlightSearchResult {
    available_seats: number;
    base_price: string;
}

/**
 * Выполняет поиск рейсов.
 */
export async function findFlights(
    origin: string,
    destination: string,
    date: string
): Promise<FlightWithDetails[]> {
    if (!/^[A-Z]{3}$/.test(origin) || !/^[A-Z]{3}$/.test(destination)) {
        throw new Error("Invalid IATA codes. Must be 3 uppercase letters.");
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        throw new Error("Invalid date format. Must be YYYY-MM-DD.");
    }

    const flights = await searchFlights(origin, destination, date);

    return flights.map((flight) => ({
        ...flight,
        available_seats: Math.floor(Math.random() * 150) + 50,
        base_price: (Math.random() * 500 + 100).toFixed(2),
    }));
}
