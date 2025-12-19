import { useState } from 'react'
import { Input } from '../../atoms/Input/Input'
import { KeyIcon, Mail, User } from 'lucide-react'
import { Flex } from '../../layout/Flex/Flex'
import { Button } from '../../atoms/Button/Button'
import styles from './Registration.module.css'
import { api, getApiErrorMessage } from '../../../shared/api/client'
import { useAuth } from '../../../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

export const Registration = () => {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [email, setEmail] = useState('')
    const [birthday, setBirthday] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [loading, setLoading] = useState(false)

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password !== password2) {
            alert('Пароли не совпадают')
            return
        }

        setLoading(true)

        try {
            const { data } = await api.post('/api/v1/auth/register', {
                email,
                password,
                firstName,
                lastName,
                middleName: middleName || undefined,
                birthday,
            })
            login(data.token)
            navigate('/')
        } catch (e) {
            alert(getApiErrorMessage(e))
        } finally {
            setLoading(false)
        }
    }

    return (
        <Flex
            as="form"
            onSubmit={submit}
            direction="column"
            gap="1.1rem"
            className={styles.form}
        >
            <div className={styles.fields}>
                <div className={styles.grid2}>
                    <div className={styles.field}>
                        <label className={styles.label}>Фамилия</label>
                        <Input
                            icon={<User />}
                            placeholder="Иванов"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Имя</label>
                        <Input
                            icon={<User />}
                            placeholder="Иван"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.field} style={{ gridColumn: '1 / -1' }}>
                        <label className={styles.label}>Отчество</label>
                        <Input
                            icon={<User />}
                            placeholder="Петрович (необязательно)"
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>E-mail</label>
                    <Input
                        type="email"
                        icon={<Mail />}
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Дата рождения</label>
                    <Input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Пароль</label>
                    <Input
                        type="password"
                        icon={<KeyIcon />}
                        placeholder="Минимум 8 символов"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Подтверждение</label>
                    <Input
                        type="password"
                        icon={<KeyIcon />}
                        placeholder="Повторите пароль"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                    />
                </div>
            </div>

            <Button size="full" disabled={loading}>
                {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
        </Flex>
    )
}
