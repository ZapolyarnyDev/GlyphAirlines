import type { FlightSearchResult } from '../../types/entities/flight'
import { api } from './client'

export async function searchFlightsApi(params: {
    origin: string
    destination: string
    date: string
}) {
    const { data } = await api.get<FlightSearchResult[]>('/api/v1/flights/search', {
        params,
    })
    return data
}
