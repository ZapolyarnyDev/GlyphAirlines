import {Input} from "../../atoms/Input/Input.tsx";
import {KeyIcon, Mail, User} from "lucide-react";
import {Flex} from "../../layout/Flex/Flex.tsx";
import {Button} from "../../atoms/Button/Button.tsx";
import styles from './Registration.module.css'

export const Registration = () => {
    return (
        <Flex as='form' direction='column' align='center' gap="1.2rem" className={styles.form}>
            <Flex direction='column' gap="1.2rem" className={styles.inputs}>
                <Input inputSize="full" placeholder="Фамилия" icon={<User/>} />
                <Input inputSize="full" placeholder="Имя" icon={<User/>}/>
                <Input inputSize="full" placeholder="Отчество" icon={<User/>}/>
                <Input type="email" inputSize="full" placeholder="E-mail" icon={<Mail/>} />
                <Input type="password" inputSize="full" placeholder="Пароль" icon={<KeyIcon/>} />
                <Input type="password" inputSize="full" placeholder="Подтвердить пароль" icon={<KeyIcon/>} />
            </Flex>
            <Button size="full">Зарегистрироваться</Button>
        </Flex>
    )
}