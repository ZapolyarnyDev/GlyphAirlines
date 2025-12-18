import styles from './AuthForm.module.css';
import {Login} from "../../molecules/Login/Login.tsx";
import {Flex} from "../../layout/Flex/Flex.tsx";
import {Registration} from "../../molecules/Registration/Registration.tsx";
import {useState} from "react";

export const AuthForm = () => {
    const [authType, setAuthType] = useState<"Login" | "Registration">("Login");
    return (
        <Flex gap="1.2rem" direction="column"  className={styles.formBlock}>
            <Flex direction="column" align="center" gap="2rem" className={styles.formContent}>
                <h3>Авторизация</h3>
                <Flex gap="2rem" justify="center" className={styles.tabContainer}>
                    <button
                        type="button"
                        onClick={() => setAuthType("Login")}
                        className={`${styles.tabButton} ${
                            authType === "Login" ? styles.active : ""
                        }`}
                    >
                        Войти
                    </button>
                    <button
                        type="button"
                        onClick={() => setAuthType("Registration")}
                        className={`${styles.tabButton} ${authType === "Registration" ? styles.active : ""}`}
                    >
                        Зарегистрироваться
                    </button>
                </Flex>
                {authType === "Login" ? <Login /> : <Registration />}
            </Flex>
        </Flex>
    );
}

