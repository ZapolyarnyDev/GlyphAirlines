import {AuthForm} from "../../components/organisms/AuthForm/AuthForm.tsx";
import {PageWrapper} from "../../components/layout/PageWrapper/PageWrapper.tsx";
import {Flex} from "../../components/layout/Flex/Flex.tsx";
import styles from './AuthPage.module.css'

function AuthPage() {
    return (
        <PageWrapper>
            <Flex justify="center" className={styles.formWrapper}>
                <AuthForm />
            </Flex>
        </PageWrapper>
    );
}

export default AuthPage;