import { Input } from '../../atoms/Input/Input'
import { KeyIcon, Mail } from 'lucide-react'
import { Flex } from '../../layout/Flex/Flex'
import { Button } from '../../atoms/Button/Button'
import styles from './Login.module.css'

export const Login = () => {
    return (
        <Flex as="form" direction="column" gap="1.1rem" className={styles.form}>
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
                    />
                </div>
            </div>

            <Button size="full">Войти</Button>
        </Flex>
    )
}
