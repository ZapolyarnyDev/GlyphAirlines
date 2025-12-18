import { db } from "../config/db.config.ts";
import {Submittable} from "pg";

/**
 * Сущность аэропорта в БД
 */
export interface Airport extends Submittable{
    id: number;
    name: string;
    code: string | null;
    city_id: number;
    iata_code: string;
    timezone: string;
}

/**
 * Получает все аэропорты.
 */
export async function findAll(): Promise<Airport[]> {
    const sql = `
    SELECT id, name, code, city_id, iata_code, timezone
    FROM airports
    ORDER BY name
  `;

    const { rows } = await db.query<Airport>(sql);
    return rows;
}

/**
 * Получает аэропорт по его ID.
 */
export async function findById(id: number): Promise<Airport | null> {
    const sql = `
    SELECT id, name, code, city_id, iata_code, timezone
    FROM airports
    WHERE id = $1
  `;

    const { rows } = await db.query<Airport>(sql, [id]);
    return rows[0] ?? null;
}

/**
 * Получает аэропорт по коду IATA.
 */
export async function findByIataCode(
    iataCode: string
): Promise<Airport | null> {
    const sql = `
    SELECT id, name, code, city_id, iata_code, timezone
    FROM airports
    WHERE iata_code = $1
  `;

    const { rows } = await db.query<Airport>(sql, [iataCode]);
    return rows[0] ?? null;
}
