import logoImg from '../images/nurb.png';

export default function Footer() {
    return (
        <footer id="contacts" className="footer">
            <div className="container">
                <div className="footer__grid">
                    <div className="footer__col">
                        <div className="footer__logo">
                            <img src={logoImg} className="footer__logo-img" />
                            <span>PitStop</span>
                        </div>
                        <p className="footer__desc">
                            Профессиональный ремонт и обслуживание автомобилей в
                            Витебске.
                        </p>
                        <div className="footer__social">
                            <a
                                href="#"
                                className="footer__social-link"
                                aria-label="WhatsApp"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="footer__social-link"
                                aria-label="Telegram"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="footer__social-link"
                                aria-label="VK"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M15.684 0H8.316C2.755 0 0 2.755 0 8.316v7.368C0 21.245 2.755 24 8.316 24h7.368C21.245 24 24 21.245 24 15.684V8.316C24 2.755 21.245 0 15.684 0zm3.473 16.618h-1.533c-.73 0-.954-.542-2.373-1.96-1.2-1.2-1.712-.385-1.712 1.692v1.013c0 .828-.246 1.163-1.098 1.231-1.633.13-3.48-.364-4.786-2.04C5.248 13.05 4.552 10.69 4.42 10.02c-.08-.404.153-.69.544-.69h1.533c.48 0 .657.168.82.742.533 2.352 1.487 4.306 2.035 4.306.457 0 .54-.41.54-1.106v-2.277c-.077-1.266-.731-1.37-.731-1.826 0-.228.185-.446.462-.446h2.681c.397 0 .54.215.54.73v3.115c0 .415.177.585.286.585.228 0 .4-.17.635-.415 1.095-1.336 1.738-3.214 1.738-3.214.13-.323.316-.46.713-.46h1.533c.492 0 .654.26.523.7-.228.776-2.17 4.08-2.17 4.08-.192.323-.247.492 0 .792.154.215.692.662 1.046 1.008.645.615 1.174 1.17 1.307 1.415.415.692-.138 1.37-.83 1.37z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="footer__col">
                        <h4 className="footer__title">Услуги</h4>
                        <ul className="footer__links">
                            <li>
                                <a href="#services">Диагностика</a>
                            </li>
                            <li>
                                <a href="#services">Ремонт двигателя</a>
                            </li>
                            <li>
                                <a href="#services">Ремонт ходовой</a>
                            </li>
                            <li>
                                <a href="#services">Техобслуживание</a>
                            </li>
                            <li>
                                <a href="#services">Ремонт электрики</a>
                            </li>
                            <li>
                                <a href="#services">Кузовной ремонт</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer__col">
                        <h4 className="footer__title">Информация</h4>
                        <ul className="footer__links">
                            <li>
                                <a href="#about">О компании</a>
                            </li>
                            <li>
                                <a href="/reviews">Отзывы</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer__col">
                        <h4 className="footer__title">Контакты</h4>
                        <ul className="footer__contacts-list">
                            <li>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <path
                                        d="M8 1C5.2 1 3 3.2 3 6c0 3.8 5 9 5 9s5-5.2 5-9c0-2.8-2.2-5-5-5z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <circle
                                        cx="8"
                                        cy="6"
                                        r="2"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                                <span>
                                    <a href="https://www.google.com/maps/place/г.Витебск,+ул.+Гагарина+41А,+422к/@">г.Витебск, ул. Гагарина 41А, 422к</a>
                                </span>
                            </li>
                            <li>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <path
                                        d="M2 4l6 4 6-4M2 4v8a1 1 0 001 1h10a1 1 0 001-1V4M2 4a1 1 0 011-1h10a1 1 0 011 1"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <a href="mailto:hribanov555@gmail.com">
                                    Наша почта
                                </a>
                            </li>
                            <li>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <path
                                        d="M3.5 1l1.5 5-2 2a12 12 0 005 5l2-2 5 1.5v3a1 1 0 01-1 1A14 14 0 010 2a1 1 0 011-1h2.5z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <a href="tel:+375299765113">
                                    +375(29)-976-51-13
                                </a>
                            </li>
                            <li>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <circle
                                        cx="8"
                                        cy="8"
                                        r="6.5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path
                                        d="M8 4v4l3 2"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <span>Ежедневно 9:00–21:00</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer__bottom">
                <div className="container">
                    <span>
                            &copy; {new Date().getFullYear()} PitStop. Все права
                        защищены.
                    </span>
                    <a href="#">Политика конфиденциальности</a>
                </div>
            </div>
        </footer>
    );
}
