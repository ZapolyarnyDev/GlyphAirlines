import styles from './AuthForm.module.css'
import { Login } from '../../molecules/Login/Login'
import { Flex } from '../../layout/Flex/Flex'
import { Registration } from '../../molecules/Registration/Registration'
import { useState } from 'react'

export const AuthForm = () => {
    const [authType, setAuthType] = useState<'Login' | 'Registration'>('Login')

    return (
        <Flex direction="column" className={styles.formBlock}>
            <Flex direction="column" gap="0.4rem" className={styles.header}>
                <h2 className={styles.title}>
                    {authType === 'Login' ? 'Вход' : 'Регистрация'}
                </h2>
                <p className={styles.subtitle}>
                    {authType === 'Login'
                        ? 'Введите почту и пароль, чтобы продолжить'
                        : 'Заполните данные, чтобы создать аккаунт'}
                </p>
            </Flex>

            <div className={styles.tabs} role="tablist" aria-label="Авторизация">
                <button
                    type="button"
                    role="tab"
                    aria-selected={authType === 'Login'}
                    onClick={() => setAuthType('Login')}
                    className={`${styles.tabButton} ${authType === 'Login' ? styles.active : ''}`}
                >
                    Войти
                </button>

                <button
                    type="button"
                    role="tab"
                    aria-selected={authType === 'Registration'}
                    onClick={() => setAuthType('Registration')}
                    className={`${styles.tabButton} ${authType === 'Registration' ? styles.active : ''}`}
                >
                    Регистрация
                </button>
            </div>

            <Flex direction="column" className={styles.content}>
                {authType === 'Login' ? <Login /> : <Registration />}
            </Flex>
        </Flex>
    )
}
