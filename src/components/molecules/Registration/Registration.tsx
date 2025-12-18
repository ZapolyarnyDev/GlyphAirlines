import { Input } from '../../atoms/Input/Input'
import { KeyIcon, Mail, User } from 'lucide-react'
import { Flex } from '../../layout/Flex/Flex'
import { Button } from '../../atoms/Button/Button'
import styles from './Registration.module.css'

export const Registration = () => {
    return (
        <Flex as="form" direction="column" gap="1.1rem" className={styles.form}>
            <div className={styles.fields}>
                <div className={styles.grid2}>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="reg-lastName">
                            Фамилия
                        </label>
                        <Input
                            id="reg-lastName"
                            inputSize="full"
                            placeholder="Иванов"
                            icon={<User />}
                            autoComplete="family-name"
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="reg-firstName">
                            Имя
                        </label>
                        <Input
                            id="reg-firstName"
                            inputSize="full"
                            placeholder="Иван"
                            icon={<User />}
                            autoComplete="given-name"
                        />
                    </div>

                    <div className={styles.field} style={{ gridColumn: '1 / -1' }}>
                        <label className={styles.label} htmlFor="reg-middleName">
                            Отчество
                        </label>
                        <Input
                            id="reg-middleName"
                            inputSize="full"
                            placeholder="Петрович"
                            icon={<User />}
                            autoComplete="additional-name"
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="reg-email">
                        E-mail
                    </label>
                    <Input
                        id="reg-email"
                        type="email"
                        inputSize="full"
                        placeholder="name@example.com"
                        icon={<Mail />}
                        autoComplete="email"
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="reg-password">
                        Пароль
                    </label>
                    <Input
                        id="reg-password"
                        type="password"
                        inputSize="full"
                        placeholder="минимум 8 символов"
                        icon={<KeyIcon />}
                        autoComplete="new-password"
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="reg-password2">
                        Подтверждение
                    </label>
                    <Input
                        id="reg-password2"
                        type="password"
                        inputSize="full"
                        placeholder="повторите пароль"
                        icon={<KeyIcon />}
                        autoComplete="new-password"
                    />
                </div>
            </div>

            <Button size="full">Зарегистрироваться</Button>
        </Flex>
    )
}
