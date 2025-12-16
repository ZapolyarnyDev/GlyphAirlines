import styles from './Button.module.css'
import type { ButtonProps } from "../../../types/components/Button/button-props"

export const Button = ({
  children,
  href,
  variant = 'primary',
  size = 'small',
  disabled = false,
  loading = false,
  color = 'var(--primary-color)',
  ...props
}: ButtonProps) => {
  const Component = href ? 'a' : 'button';

  const colorStyle = {...color && { ['--btn-color' as string]: color }}
  return (
    <Component
      {...props}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${
        loading ? styles.loading : ''
      }`}
      style={colorStyle}
    >
      {children}
    </Component>
  )
}