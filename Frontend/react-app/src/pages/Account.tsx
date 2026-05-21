import { Link } from 'react-router-dom';

const mockOrders = [
  { id: 201, date: '19.05.2026', car: 'Toyota Camry 2020', service: 'Диагностика двигателя', status: 'В работе', amount: '55 Br' },
  { id: 202, date: '12.05.2026', car: 'Toyota Camry 2020', service: 'Замена масла', status: 'Завершён', amount: '90 Br' },
  { id: 203, date: '28.04.2026', car: 'Toyota Camry 2020', service: 'Ремонт ходовой', status: 'Завершён', amount: '200 Br' },
];

const statusColor: Record<string, string> = {
  'В работе': 'blue',
  'Ожидает': 'yellow',
  'Подтверждён': 'blue',
  'Готов': 'green',
  'Завершён': 'green',
  'Отменён': 'red',
};

function getUserName(): string {
  const token = localStorage.getItem('token');
  if (!token) return 'Пользователь';
  try {
    const raw = atob(token.split('.')[1]);
    const utf8 = decodeURIComponent(escape(raw));
    const p = JSON.parse(utf8);
    return p['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || p.unique_name || p.name || 'Пользователь';
  } catch {
    return 'Пользователь';
  }
}

export default function Account() {
  const name = getUserName();

  return (
    <div className="emp-main" style={{ minHeight: 'calc(100vh - 120px)' }}>
      <div className="emp-page">
        <div className="emp-page__header">
          <div>
            <h1>Личный кабинет</h1>
            <p>Здравствуйте, {name}</p>
          </div>
          <Link to="/order" className="btn btn-primary">Новый заказ</Link>
        </div>

        <div className="emp-stats">
          <div className="emp-stat">
            <div className="emp-stat__icon emp-stat__icon--blue">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M8 2v4M16 2v4M3 10h18" />
              </svg>
            </div>
            <div className="emp-stat__info">
              <span className="emp-stat__value">{mockOrders.length}</span>
              <span className="emp-stat__label">Всего заказов</span>
            </div>
          </div>
          <div className="emp-stat">
            <div className="emp-stat__icon emp-stat__icon--green">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M8 12l3 3 5-5" />
              </svg>
            </div>
            <div className="emp-stat__info">
              <span className="emp-stat__value">{mockOrders.filter(o => o.status === 'Завершён').length}</span>
              <span className="emp-stat__label">Выполнено</span>
            </div>
          </div>
          <div className="emp-stat">
            <div className="emp-stat__icon emp-stat__icon--yellow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
            </div>
            <div className="emp-stat__info">
              <span className="emp-stat__value">{mockOrders.filter(o => o.status === 'В работе' || o.status === 'Ожидает').length}</span>
              <span className="emp-stat__label">В обработке</span>
            </div>
          </div>
        </div>

        <div className="emp-page__section">
          <h2>Мои заказы</h2>
          <table className="emp-table">
            <thead>
              <tr>
                <th>№</th>
                <th>Дата</th>
                <th>Автомобиль</th>
                <th>Услуга</th>
                <th>Статус</th>
                <th>Сумма</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map(order => (
                <tr key={order.id}>
                  <td className="emp-table__id">#{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.car}</td>
                  <td>{order.service}</td>
                  <td><span className={`emp-badge emp-badge--${statusColor[order.status] || 'gray'}`}>{order.status}</span></td>
                  <td className="emp-table__price">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="emp-page__section">
          <h2>Мои данные</h2>
          <div className="acc-info">
            <div className="acc-info__avatar">{name.charAt(0)}</div>
            <div className="acc-info__body">
              <div className="acc-info__name">{name}</div>
              <div className="acc-info__detail">ivan@example.com</div>
              <div className="acc-info__detail">+375(29)123-45-67</div>
              <div className="acc-info__detail">г. Витебск, ул. Гагарина 41А, 422к</div>
            </div>
          </div>
        </div>

        <div className="acc-actions">
          <Link to="/" className="acc-actions__btn">На главную</Link>
          <Link to="/reviews" className="acc-actions__btn">Оставить отзыв</Link>
        </div>
      </div>
    </div>
  );
}
