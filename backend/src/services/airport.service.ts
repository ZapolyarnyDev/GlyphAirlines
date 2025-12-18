import {
    findAll,
    findById,
    findByIataCode,
    Airport,
} from "../repositories/airport.repository.ts";

/**
 * DTO для ответа наружу
 */
export interface AirportDTO {
    id: number;
    name: string;
    code: string;
    cityId: number;
    timezone: string;
}

/**
 * Получает список всех аэропортов.
 */
export async function getAllAirports(): Promise<Airport[]> {
    return findAll();
}

/**
 * Получает детали аэропорта по ID или коду IATA.
 */
export async function getAirportDetails(
    identifier: number | string
): Promise<AirportDTO | null> {
    let airport: Airport | null = null;

    if (typeof identifier === "number" || /^\d+$/.test(String(identifier))) {
        airport = await findById(Number(identifier));
    } else if (identifier.length === 3) {
        airport = await findByIataCode(identifier.toUpperCase());
    } else {
        throw new Error(
            "Invalid airport identifier. Must be ID or 3-letter IATA code."
        );
    }

    if (!airport) {
        return null;
    }

    return {
        id: airport.id,
        name: airport.name,
        code: airport.iata_code,
        cityId: airport.city_id,
        timezone: airport.timezone,
    };
}
