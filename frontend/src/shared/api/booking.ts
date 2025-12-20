import { api } from './client'

export function createBookingApi(scheduleId: number) {
    return api.post('/api/v1/bookings', {
        scheduleId,
        passengers: [
            {
                passengerId: 1,
            },
        ],
    })
}

export function getMyBookingsApi() {
    return api.get('/api/v1/bookings/my')
}

export function getMyBookingByIdApi(id: number) {
    return api.get(`/api/v1/bookings/my/${id}`)
}

export function cancelBookingApi(id: number) {
    return api.delete(`/api/v1/bookings/my/${id}`)
}