import { useState } from 'react'
import { Input } from '../../atoms/Input/Input'
import { KeyIcon, Mail } from 'lucide-react'
import { Flex } from '../../layout/Flex/Flex'
import { Button } from '../../atoms/Button/Button'
import styles from './Login.module.css'
import { api, getApiErrorMessage } from '../../../shared/api/client.ts'
import { useAuth } from '../../../auth/AuthContext.tsx'

export const Login = () => {
    const { login } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data } = await api.post('/api/v1/auth/login', {
                email,
                password,
            })
            login(data.token)
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
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="login-email">
                        E-mail
                    </label>
                    <Input
                        id="login-email"
                        type="email"
                        inputSize="full"
                        placeholder="name@example.com"
                        icon={<Mail />}
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="login-password">
                        Пароль
                    </label>
                    <Input
                        id="login-password"
                        type="password"
                        inputSize="full"
                        placeholder="••••••••"
                        icon={<KeyIcon />}
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            </div>

            <Button size="full" disabled={loading}>
                {loading ? 'Вход...' : 'Войти'}
            </Button>
        </Flex>
    )
}
