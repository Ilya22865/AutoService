import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../images/nurb.png';
import { authApi } from '../api';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await authApi.login({ email, password });
      localStorage.setItem('token', data.token);
      navigate(data.role === 'Employee' ? '/employee' : '/account');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

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
        <form className="auth-card__form" onSubmit={handleSubmit}>
          <div className="auth-card__field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" className="auth-card__input" required />
          </div>
          <div className="auth-card__field">
            <label htmlFor="password">Пароль</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="auth-card__input" required />
          </div>
          <div className="auth-card__options">
            <label className="auth-card__checkbox">
              <input type="checkbox" />
              <span>Запомнить меня</span>
            </label>
            <a href="#" className="auth-card__forgot">Забыли пароль?</a>
          </div>
          {error && <div className="auth-card__error">{error}</div>}
          <button type="submit" className="btn btn-primary auth-card__submit" disabled={loading}>
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
        <div className="auth-card__footer">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
}
