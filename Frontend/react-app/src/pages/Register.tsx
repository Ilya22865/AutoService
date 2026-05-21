import { Link } from 'react-router-dom';
import logoImg from '../images/nurb.png';

export default function Register() {
  return (
    <div className="auth-page">
      <div className="auth-card auth-card--wide">
        <div className="auth-card__header">
          <Link to="/" className="auth-card__logo">
            <img src={logoImg} className="auth-card__logo-img" />
            <span>PitStop</span>
          </Link>
          <h1>Регистрация</h1>
          <p>Создайте аккаунт для отслеживания заказов</p>
        </div>
        <form className="auth-card__form" onSubmit={e => e.preventDefault()}>
          <div className="auth-card__row">
            <div className="auth-card__field">
              <label htmlFor="name">Имя</label>
              <input id="name" type="text" placeholder="Иван Иванов" className="auth-card__input" required />
            </div>
            <div className="auth-card__field">
              <label htmlFor="phone">Телефон</label>
              <input id="phone" type="tel" placeholder="+375(29)123-45-67" className="auth-card__input" required />
            </div>
          </div>
          <div className="auth-card__field">
            <label htmlFor="reg-email">Email</label>
            <input id="reg-email" type="email" placeholder="email@example.com" className="auth-card__input" required />
          </div>
          <div className="auth-card__field">
            <label htmlFor="reg-address">Адрес</label>
            <input id="reg-address" type="text" placeholder="г. Витебск, ул. Гагарина 41А, 422к" className="auth-card__input" />
          </div>
          <div className="auth-card__row">
            <div className="auth-card__field">
              <label htmlFor="reg-password">Пароль</label>
              <input id="reg-password" type="password" placeholder="Минимум 8 символов" className="auth-card__input" required />
            </div>
            <div className="auth-card__field">
              <label htmlFor="reg-confirm">Подтверждение пароля</label>
              <input id="reg-confirm" type="password" placeholder="Повторите пароль" className="auth-card__input" required />
            </div>
          </div>
          <div className="auth-card__policy">
            <label className="auth-card__checkbox">
              <input type="checkbox" required />
              <span>Я согласен с <a href="#">политикой обработки персональных данных</a></span>
            </label>
          </div>
          <button type="submit" className="btn btn-primary auth-card__submit">Зарегистрироваться</button>
        </form>
        <div className="auth-card__footer">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </div>
      </div>
    </div>
  );
}
