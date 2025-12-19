import type { Airport } from '../../types/entities/airport'
import { api } from './client'

export async function getAirportsApi() {
    const { data } = await api.get<Airport[]>('/api/v1/airports')
    return data
}
