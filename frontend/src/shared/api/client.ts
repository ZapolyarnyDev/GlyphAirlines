import axios, { AxiosError } from 'axios'
import { API_BASE_URL } from '../../config/api'

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export interface ApiErrorResponse {
    message?: string
}

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

export function getApiErrorMessage(err: unknown): string {
    if (axios.isAxiosError(err)) {
        const e = err as AxiosError<ApiErrorResponse>
        return e.response?.data?.message ?? e.message ?? 'Ошибка запроса'
    }
    if (err instanceof Error) return err.message
    return 'Ошибка запроса'
}

