import type {ReactNode} from "react";
import styles from './PageWrapper.module.css'

type PageWrapperProps = {
    children: ReactNode;
};

export const PageWrapper = ({ children }: PageWrapperProps) => {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    );
};