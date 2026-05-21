import { Link } from 'react-router-dom';
import logoImg from '../images/nurb.png';

export default function Login() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <Link to="/" className="auth-card__logo">
            <img src={logoImg} className="auth-card__logo-img" />
            <span>PitStop</span>
          </Link>
          <h1>Вход в систему</h1>
          <p>Войдите в свой аккаунт чтобы управлять заказами</p>
        </div>
        <form className="auth-card__form" onSubmit={e => e.preventDefault()}>
          <div className="auth-card__field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="email@example.com" className="auth-card__input" required />
          </div>
          <div className="auth-card__field">
            <label htmlFor="password">Пароль</label>
            <input id="password" type="password" placeholder="••••••••" className="auth-card__input" required />
          </div>
          <div className="auth-card__options">
            <label className="auth-card__checkbox">
              <input type="checkbox" />
              <span>Запомнить меня</span>
            </label>
            <a href="#" className="auth-card__forgot">Забыли пароль?</a>
          </div>
          <button type="submit" className="btn btn-primary auth-card__submit">Войти</button>
        </form>
        <div className="auth-card__footer">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
}
