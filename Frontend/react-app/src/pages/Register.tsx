import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../images/nurb.png';
import { authApi } from '../api';

type Role = 'client' | 'employee';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState<Role>('client');
  const [form, setForm] = useState({
    fullName: '', phoneNumber: '', email: '',
    address: '', password: '', confirmPassword: '',
    employeeCode: '', position: '', salary: '',
  });

  const clean = (v: string) => v.replace(/[\x00-\x1f\x7f]/g, '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: clean(e.target.value) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await authApi.register({
        fullName: clean(form.fullName),
        email: clean(form.email),
        password: form.password,
        ...(role === 'employee'
          ? { employeeCode: clean(form.employeeCode), position: clean(form.position), salary: Number(form.salary) || 0 }
          : { address: clean(form.address), phoneNumber: clean(form.phoneNumber) }),
      });
      if ('token' in data && data.token) {
        localStorage.setItem('token', data.token);
        navigate(data.role === 'Employee' ? '/employee' : '/account');
      } else {
        navigate('/login', { state: { message: 'Проверьте почту для подтверждения email' } });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

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

        <div className="auth-card__role-toggle">
          <button
            type="button"
            className={`auth-card__role-btn ${role === 'client' ? 'active' : ''}`}
            onClick={() => setRole('client')}
          >
            Я клиент
          </button>
          <button
            type="button"
            className={`auth-card__role-btn ${role === 'employee' ? 'active' : ''}`}
            onClick={() => setRole('employee')}
          >
            Я сотрудник
          </button>
        </div>

        <form className="auth-card__form" onSubmit={handleSubmit}>
          <div className="auth-card__row">
            <div className="auth-card__field">
              <label htmlFor="name">Имя</label>
              <input id="name" name="fullName" value={form.fullName} onChange={handleChange} type="text" placeholder="Иван Иванов" className="auth-card__input" required />
            </div>
            {role === 'client' && (
              <div className="auth-card__field">
                <label htmlFor="phone">Телефон</label>
                <input id="phone" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} type="tel" placeholder="+375(29)123-45-67" className="auth-card__input" />
              </div>
            )}
          </div>

          <div className="auth-card__field">
            <label htmlFor="reg-email">Email</label>
            <input id="reg-email" name="email" value={form.email} onChange={handleChange} type="email" placeholder="email@example.com" className="auth-card__input" required />
          </div>

          {role === 'client' && (
            <div className="auth-card__field">
              <label htmlFor="reg-address">Адрес</label>
              <input id="reg-address" name="address" value={form.address} onChange={handleChange} type="text" placeholder="г. Витебск, ул. Гагарина 41А, 422к" className="auth-card__input" />
            </div>
          )}

          {role === 'employee' && (
            <div className="auth-card__row">
              <div className="auth-card__field">
                <label htmlFor="position">Должность</label>
                <input id="position" name="position" value={form.position} onChange={handleChange} type="text" placeholder="Механик" className="auth-card__input" required />
              </div>
              <div className="auth-card__field">
                <label htmlFor="salary">Зарплата (Br)</label>
                <input id="salary" name="salary" value={form.salary} onChange={handleChange} type="number" placeholder="1500" className="auth-card__input" required />
              </div>
            </div>
          )}

          <div className="auth-card__row">
            <div className="auth-card__field">
              <label htmlFor="reg-password">Пароль</label>
              <input id="reg-password" name="password" value={form.password} onChange={handleChange} type="password" placeholder="Минимум 8 символов" className="auth-card__input" required />
            </div>
            <div className="auth-card__field">
              <label htmlFor="reg-confirm">Подтверждение пароля</label>
              <input id="reg-confirm" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} type="password" placeholder="Повторите пароль" className="auth-card__input" required />
            </div>
          </div>

          {role === 'employee' && (
            <div className="auth-card__field">
              <label htmlFor="empCode">Код сотрудника</label>
              <input id="empCode" name="employeeCode" value={form.employeeCode} onChange={handleChange} type="text" placeholder="Введите код доступа" className="auth-card__input" required />
            </div>
          )}

          <div className="auth-card__policy">
            <label className="auth-card__checkbox">
              <input type="checkbox" required />
              <span>Я согласен с <a href="#">политикой обработки персональных данных</a></span>
            </label>
          </div>

          {error && <div className="auth-card__error">{error}</div>}

          <button type="submit" className="btn btn-primary auth-card__submit" disabled={loading}>
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className="auth-card__footer">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </div>
      </div>
    </div>
  );
}
