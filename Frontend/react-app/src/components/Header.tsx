import { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../images/nurb.png";

const navLinks = [
    { href: "/", label: "Главная" },
    { href: "/#services", label: "Услуги" },
    { href: "/#catalog", label: "Запчасти" },
    { href: "/#about", label: "О нас" },
    { href: "/order", label: "Запись" },
    { href: "/reviews", label: "Отзывы" },
    { href: "/#contacts", label: "Контакты" },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="header__top">
                <div className="container header__top-inner">
                    <div className="header__contacts">
                        <a href="tel:+375299765113" className="header__phone">
                            +375(29)976-51-13
                        </a>
                        <span className="header__sep">|</span>
                        <span className="header__hours">
                            Ежедневно 9:00–21:00
                        </span>
                    </div>
                    <div className="header__auth-links">
                        <Link to="/login" className="header__auth-link">
                            Войти
                        </Link>
                        <Link
                            to="/register"
                            className="header__auth-link header__auth-link--primary"
                        >
                            Регистрация
                        </Link>
                    </div>
                </div>
            </div>
            <div className="header__main">
                <div className="container header__main-inner">
                    <Link to="/" className="header__logo">
                        <img src={logoImg} className="header__logo-img" />
                        <span className="header__logo-text">PitStop</span>
                    </Link>
                    <nav className={`header__nav ${menuOpen ? "open" : ""}`}>
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="header__nav-link"
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <Link
                            to="/employee"
                            className="header__nav-link header__nav-link--emp"
                            onClick={() => setMenuOpen(false)}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            >
                                <path d="M8 2L2 5v6l6 3 6-3V5L8 2z" />
                                <path d="M2 5l6 3 6-3M8 8v6" />
                            </svg>
                            Панель
                        </Link>
                    </nav>
                    <button
                        className="header__burger"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Меню"
                    >
                        <span
                            className={`header__burger-line ${menuOpen ? "open" : ""}`}
                        />
                        <span
                            className={`header__burger-line ${menuOpen ? "open" : ""}`}
                        />
                        <span
                            className={`header__burger-line ${menuOpen ? "open" : ""}`}
                        />
                    </button>
                </div>
            </div>
        </header>
    );
}
