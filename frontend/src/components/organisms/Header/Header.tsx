import { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ChevronDown, LogOut, Plane, UserRound } from 'lucide-react'
import { Button } from '../../atoms/Button/Button'
import styles from './Header.module.css'

interface HeaderProps {
    isAuth: boolean
    hideAccountControls?: boolean
    userName?: string
    onLoginClick?: () => void
    onLogoutClick?: () => void
}

export const Header = ({
                           isAuth,
                           hideAccountControls = false,
                           userName,
                           onLoginClick,
                           onLogoutClick,
                       }: HeaderProps) => {
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!menuRef.current) return
            if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false)
        }
        const onEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMenuOpen(false)
        }

        document.addEventListener('mousedown', onDocClick)
        document.addEventListener('keydown', onEsc)
        return () => {
            document.removeEventListener('mousedown', onDocClick)
            document.removeEventListener('keydown', onEsc)
        }
    }, [])

    const handleLogin = () => {
        if (onLoginClick) return onLoginClick()
        navigate('/auth')
    }

    const handleLogout = () => {
        setMenuOpen(false)
        onLogoutClick?.()
    }

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <NavLink to="/" className={styles.brand} aria-label="GlyphAirlines">
                    <span className={styles.brandIcon} aria-hidden="true">
                      <Plane size={24} />
                    </span>
                    <span className={styles.brandText}>GlyphAirlines</span>
                </NavLink>

                <nav className={styles.nav} aria-label="Навигация">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                        }
                    >
                        Главная
                    </NavLink>

                    <NavLink
                        to="/tickets"
                        className={({ isActive }) =>
                            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                        }
                    >
                        Мои билеты
                    </NavLink>
                </nav>

                <div className={styles.right}>
                    {!hideAccountControls && (
                        <>
                            {!isAuth ? (
                                <Button className={styles.loginButton} onClick={handleLogin}>
                                    Войти
                                </Button>
                            ) : (
                                <div className={styles.account} ref={menuRef}>
                                    <button
                                        type="button"
                                        className={styles.accountButton}
                                        aria-haspopup="menu"
                                        aria-expanded={menuOpen}
                                        onClick={() => setMenuOpen((v) => !v)}
                                    >
                    <span className={styles.avatar} aria-hidden="true">
                      <UserRound size={18} />
                    </span>

                                        <span className={styles.accountText}>
                      {userName ? userName : 'Аккаунт'}
                    </span>

                                        <span className={styles.chevron} aria-hidden="true">
                      <ChevronDown size={18} />
                    </span>
                                    </button>

                                    {menuOpen && (
                                        <div className={styles.menu} role="menu" aria-label="Меню аккаунта">
                                            <button
                                                type="button"
                                                className={styles.menuItem}
                                                role="menuitem"
                                                onClick={handleLogout}
                                            >
                                                <LogOut size={18} />
                                                Выйти
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
