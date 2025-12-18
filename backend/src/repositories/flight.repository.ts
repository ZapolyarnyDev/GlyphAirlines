import { db } from "../config/db.config.ts";
import {Submittable} from "pg";

/**
 * Сущность результата поиска рейсов
 */
export interface FlightSearchResult extends Submittable{
    schedule_id: number;
    scheduled_departure: string;
    scheduled_arrival: string;
    flight_number: string;
    origin_iata: string;
    destination_iata: string;
    airline_name: string;
    aircraft_model: string;
}

/**
 * Ищет доступные рейсы по аэропортам отправления и прибытия и дате.
 */
export async function searchFlights(
    originIata: string,
    destinationIata: string,
    date: string
): Promise<FlightSearchResult[]> {
    const sql = `
    SELECT
        s.id AS schedule_id,
        s.scheduled_departure,
        s.scheduled_arrival,
        r.flight_number,
        a_orig.iata_code AS origin_iata,
        a_dest.iata_code AS destination_iata,
        al.name AS airline_name,
        ac.model AS aircraft_model
    FROM
        schedules s
    JOIN
        routes r ON s.route_id = r.id
    JOIN
        airports a_orig ON r.origin_airport_id = a_orig.id
    JOIN
        airports a_dest ON r.end_airport_id = a_dest.id
    JOIN
        airlines al ON r.airline_id = al.id
    JOIN
        aircrafts ac ON s.aircraft_id = ac.id
    WHERE
        a_orig.iata_code = $1
        AND a_dest.iata_code = $2
        AND DATE(s.scheduled_departure) = $3
    ORDER BY
        s.scheduled_departure
  `;

    const { rows } = await db.query<FlightSearchResult>(sql, [
        originIata,
        destinationIata,
        date,
    ]);

    return rows;
}
