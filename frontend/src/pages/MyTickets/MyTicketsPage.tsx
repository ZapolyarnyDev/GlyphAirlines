import { useEffect, useState } from 'react'
import { PageWrapper } from '../../components/layout/PageWrapper/PageWrapper'
import { Header } from '../../components/organisms/Header/Header'
import { Button } from '../../components/atoms/Button/Button'
import { Flex } from '../../components/layout/Flex/Flex'
import { useAuth } from '../../auth/AuthContext'
import { getMyBookingsApi, getMyBookingByIdApi, cancelBookingApi } from '../../shared/api/booking.ts'
import { getApiErrorMessage } from '../../shared/api/client'
import styles from './MyTicketsPage.module.css'

export const MyTicketsPage = () => {
    const { isAuth, user, logout } = useAuth()

    const [bookings, setBookings] = useState<any[]>([])
    const [expandedId, setExpandedId] = useState<number | null>(null)
    const [tickets, setTickets] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        ;(async () => {
            try {
                setLoading(true)
                const { data } = await getMyBookingsApi()
                setBookings(data)
            } catch (e) {
                setError(getApiErrorMessage(e))
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    const openBooking = async (id: number) => {
        if (expandedId === id) {
            setExpandedId(null)
            return
        }

        try {
            const { data } = await getMyBookingByIdApi(id)
            setExpandedId(id)
            setTickets(data.tickets)
        } catch (e) {
            alert(getApiErrorMessage(e))
        }
    }

    const cancelBooking = async (id: number) => {
        if (!confirm('Отменить бронирование?')) return

        try {
            await cancelBookingApi(id)
            setBookings((prev) =>
                prev.map((b) =>
                    b.id === id ? { ...b, status: 'CANCELLED' } : b
                ))
        } catch (e) {
            alert(getApiErrorMessage(e))
        }
    }

    return (
        <PageWrapper>
            <Header
                isAuth={isAuth}
                userName={user?.email}
                onLogoutClick={logout}
            />

            <section className={styles.page}>
                <h1 className={styles.title}>Мои билеты</h1>

                {loading && <div>Загрузка…</div>}
                {error && <div className={styles.error}>{error}</div>}

                {!loading && bookings.length === 0 && (
                    <div className={styles.empty}>У вас пока нет бронирований</div>
                )}

                <div className={styles.list}>
                    {bookings.map((b) => (
                        <article key={b.id} className={styles.card}>
                            <Flex justify="between" align="center">
                                <div>
                                    <div>ID брони: {b.id}</div>
                                    <div>Сумма: {b.total_amount}</div>
                                    <div>Статус: {b.status}</div>
                                </div>

                                <Flex gap="0.5rem">
                                    <Button
                                        size="small"
                                        onClick={() => openBooking(b.id)}
                                    >
                                        {expandedId === b.id
                                            ? 'Скрыть'
                                            : 'Подробнее'}
                                    </Button>

                                    {b.status !== 'CANCELLED' && (
                                        <Button
                                            size="small"
                                            color="var(--error-color)"
                                            onClick={() => cancelBooking(b.id)}
                                        >
                                            Отменить
                                        </Button>
                                    )}
                                </Flex>
                            </Flex>

                            {expandedId === b.id && (
                                <div className={styles.tickets}>
                                    {tickets.map((t) => (
                                        <div key={t.id} className={styles.ticket}>
                                            <div>Место: {t.seat}</div>
                                            <div>Цена: {t.price}</div>
                                            <div>Пассажир ID: {t.passenger_id}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </section>
        </PageWrapper>
    )
}
