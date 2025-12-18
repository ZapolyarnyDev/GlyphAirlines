import {Input} from "../../atoms/Input/Input.tsx";
import {KeyIcon, Mail} from "lucide-react";
import {Flex} from "../../layout/Flex/Flex.tsx";
import {Button} from "../../atoms/Button/Button.tsx";
import styles from './Login.module.css'

export const Login = () => {
    return (
        <Flex as='form' direction='column' align='center' gap="1.2rem" className={styles.form}>
            <Flex direction='column' gap="1.2rem" className={styles.inputs}>
                <Input type="email" inputSize="full" placeholder="E-mail" icon={<Mail/>} />
                <Input type="password" inputSize="full" placeholder="Пароль" icon={<KeyIcon/>} />
            </Flex>
            <Button size="full">Войти</Button>
        </Flex>
    )
}