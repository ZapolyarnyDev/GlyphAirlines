export interface Airport {
    id: number;
    name: string;
    code: string | null;
    city_id: number;
    iata_code: string;
    timezone: string;
}