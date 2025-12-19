export interface FlightSearchResult {
    schedule_id: number;
    scheduled_departure: string;
    scheduled_arrival: string;
    flight_number: string;
    origin_iata: string;
    destination_iata: string;
    airline_name: string;
    aircraft_model: string;
}