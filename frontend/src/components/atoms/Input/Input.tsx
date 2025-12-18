import styles from './Input.module.css'
import type { InputProps } from '../../../types/components/Input/input-props'
import { Flex } from '../../layout/Flex/Flex'

export const Input = ({
                          type = 'text',
                          placeholder,
                          disabled = false,
                          required = false,
                          error = false,
                          inputSize = 'small',
                          icon,
                          ...props
                      }: InputProps) => {
    return (
        <Flex
            align="center"
            className={`${styles.inputWrapper} ${styles[inputSize]} ${disabled ? styles.disabled : ''} ${error ? styles.error : ''}`}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            <input
                {...props}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={`${styles.input} ${icon ? styles.withIcon : ''}`}
            />
        </Flex>
    )
}
