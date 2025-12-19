import { useEffect, useMemo, useState } from 'react'
import styles from './HomePage.module.css'
import { Input } from '../../components/atoms/Input/Input'
import { Button } from '../../components/atoms/Button/Button'
import { Flex } from '../../components/layout/Flex/Flex'
import { MapPin, CalendarDays, ArrowLeftRight } from 'lucide-react'

import type { Airport } from '../../types/entities/airport'
import type { FlightSearchResult } from '../../types/entities/flight'
import { getAirportsApi } from '../../shared/api/airports'
import { searchFlightsApi } from '../../shared/api/flights'
import {PageWrapper} from "../../components/layout/PageWrapper/PageWrapper.tsx";
import { getApiErrorMessage } from '../../shared/api/client'
import {Header} from "../../components/organisms/Header/Header.tsx";

function toISODate(d: Date) {
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
}

function formatDT(iso: string) {
    const date = new Date(iso)
    return date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export const HomePage = () => {
    const [airports, setAirports] = useState<Airport[]>([])
    const [loadingAirports, setLoadingAirports] = useState(true)

    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')
    const [date, setDate] = useState(toISODate(new Date()))

    const [flights, setFlights] = useState<FlightSearchResult[]>([])
    const [loadingFlights, setLoadingFlights] = useState(false)

    const [error, setError] = useState<string | null>(null)

    const airportsByIata = useMemo(() => {
        const map = new Map<string, Airport>()
        for (const a of airports) map.set(a.iata_code.toUpperCase(), a)
        return map
    }, [airports])

    useEffect(() => {
        ;(async () => {
            try {
                setLoadingAirports(true)
                const data = await getAirportsApi()
                setAirports(data)
            } catch (e: unknown) {
                setError(getApiErrorMessage(e))
            } finally {
                setLoadingAirports(false)
            }
        })()
    }, [])

    const runSearch = async () => {
        setError(null)

        if (!origin || !destination || !date) {
            setError('Заполните "откуда", "куда" и дату')
            return
        }

        try {
            setLoadingFlights(true)
            const data = await searchFlightsApi({
                origin: origin.trim().toUpperCase(),
                destination: destination.trim().toUpperCase(),
                date,
            })
            setFlights(data)
        } catch (e: unknown) {
            setError(getApiErrorMessage(e))
            setFlights([])
        } finally {
            setLoadingFlights(false)
        }
    }

    const swap = () => {
        setOrigin(destination)
        setDestination(origin)
    }

    return (
       <PageWrapper>
           <Header isAuth={false}/>
            <section className={styles.hero}>
                <h1 className={styles.title}>Бронирование билетов</h1>
                <p className={styles.subtitle}>
                    Найди доступные рейсы GlyphAirlines по дате и направлению.
                </p>

                <div className={styles.searchCard}>
                    <Flex direction="column" gap="1rem">
                        <div className={styles.grid}>
                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="origin">
                                    Откуда (IATA)
                                </label>
                                <Input
                                    id="origin"
                                    placeholder="SVO"
                                    icon={<MapPin />}
                                    inputSize="full"
                                    value={origin}
                                    onChange={(e) => setOrigin(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>

                            <button
                                type="button"
                                className={styles.swap}
                                aria-label="Поменять местами"
                                onClick={swap}
                            >
                                <ArrowLeftRight size={18} />
                            </button>

                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="destination">
                                    Куда (IATA)
                                </label>
                                <Input
                                    id="destination"
                                    placeholder="LED"
                                    icon={<MapPin />}
                                    inputSize="full"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="date">
                                    Дата
                                </label>
                                <Input
                                    id="date"
                                    type="date"
                                    icon={<CalendarDays />}
                                    inputSize="full"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <Button size="small" onClick={runSearch} disabled={loadingFlights}>
                                {loadingFlights ? 'Ищем рейсы…' : 'Найти рейсы'}
                            </Button>

                            <div className={styles.hint}>
                                {loadingAirports
                                    ? 'Загрузка справочника аэропортов…'
                                    : `Аэропортов: ${airports.length}`}
                            </div>
                        </div>

                        {error && <div className={styles.error}>{error}</div>}
                    </Flex>
                </div>
            </section>

            <section className={styles.results}>
                <div className={styles.resultsHeader}>
                    <h2 className={styles.resultsTitle}>Доступные рейсы</h2>
                    <p className={styles.resultsSubtitle}>
                        {flights.length
                            ? `Найдено: ${flights.length}`
                            : 'Сделайте поиск, чтобы увидеть список'}
                    </p>
                </div>

                <div className={styles.list}>
                    {flights.map((f) => {
                        const originA = airportsByIata.get(f.origin_iata.toUpperCase())
                        const destA = airportsByIata.get(f.destination_iata.toUpperCase())

                        return (
                            <article className={styles.card} key={`${f.schedule_id}-${f.flight_number}`}>
                                <div className={styles.cardTop}>
                                    <div className={styles.route}>
                                        <div className={styles.iata}>{f.origin_iata}</div>
                                        <div className={styles.routeLine} aria-hidden="true" />
                                        <div className={styles.iata}>{f.destination_iata}</div>
                                    </div>

                                    <div className={styles.meta}>
                                        <div className={styles.flightNo}>{f.flight_number}</div>
                                        <div className={styles.airline}>{f.airline_name}</div>
                                    </div>
                                </div>

                                <div className={styles.cardBody}>
                                    <div className={styles.timeBlock}>
                                        <div className={styles.timeLabel}>Вылет</div>
                                        <div className={styles.timeValue}>{formatDT(f.scheduled_departure)}</div>
                                        <div className={styles.place}>
                                            {originA ? originA.name : '—'}
                                        </div>
                                    </div>

                                    <div className={styles.timeBlock}>
                                        <div className={styles.timeLabel}>Прилёт</div>
                                        <div className={styles.timeValue}>{formatDT(f.scheduled_arrival)}</div>
                                        <div className={styles.place}>
                                            {destA ? destA.name : '—'}
                                        </div>
                                    </div>

                                    <div className={styles.aircraft}>
                                        <div className={styles.timeLabel}>Самолёт</div>
                                        <div className={styles.aircraftValue}>{f.aircraft_model}</div>
                                    </div>
                                </div>

                            </article>
                        )
                    })}

                    {!loadingFlights && flights.length === 0 && (
                        <div className={styles.empty}>
                            Пока пусто. Введи IATA-коды и дату, затем нажми “Найти рейсы”.
                        </div>
                    )}
                </div>
            </section>
       </PageWrapper>
    )
}
