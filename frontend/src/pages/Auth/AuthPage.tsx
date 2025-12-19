import {AuthForm} from "../../components/organisms/AuthForm/AuthForm.tsx";
import {PageWrapper} from "../../components/layout/PageWrapper/PageWrapper.tsx";
import {Flex} from "../../components/layout/Flex/Flex.tsx";
import styles from './AuthPage.module.css'
import {Header} from "../../components/organisms/Header/Header.tsx";

function AuthPage() {
    return (
        <PageWrapper>
            <Header isAuth={false} hideAccountControls={true} />
            <Flex justify="center" className={styles.formWrapper}>
                <AuthForm />
            </Flex>
        </PageWrapper>
    );
}

export default AuthPage;