import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrdersApi, type OrderDto } from '../api';

const statusMap: Record<string, { label: string; color: string }> = {
  'Pending': { label: 'Ожидает', color: 'yellow' },
  'Completed': { label: 'Завершён', color: 'green' },
  'Cancelled': { label: 'Отменён', color: 'red' },
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
  const [orders, setOrders] = useState<OrderDto[]>([]);

  useEffect(() => {
    getOrdersApi.getOrders().then(setOrders).catch(console.error);
  }, []);

  const name = getUserName();
  const completed = orders.filter(o => o.status === 'Completed').length;
  const inProgress = orders.filter(o => o.status === 'Pending').length;

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
              <span className="emp-stat__value">{orders.length}</span>
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
              <span className="emp-stat__value">{completed}</span>
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
              <span className="emp-stat__value">{inProgress}</span>
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
                <th>Автомобиль</th>
                <th>Услуги</th>
                <th>Статус</th>
                <th>Сумма</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => {
                const st = statusMap[order.status] ?? { label: order.status, color: 'gray' };
                return (
                  <tr key={order.orderId}>
                    <td className="emp-table__id">#{order.orderId}</td>
                    <td>{order.vehicle ? `${order.vehicle.model}` : '—'}</td>
                    <td>{order.services.map(s => s.serviceName).join(', ')}</td>
                    <td><span className={`emp-badge emp-badge--${st.color}`}>{st.label}</span></td>
                    <td className="emp-table__price">{order.services.reduce((s, x) => s + x.priceAtSale * x.quantity, 0) + order.details.reduce((s, x) => s + x.priceAtSale * x.quantity, 0)} Br</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="emp-page__section">
          <h2>Мои данные</h2>
          <div className="acc-info">
            <div className="acc-info__avatar">{name.charAt(0)}</div>
            <div className="acc-info__body">
              <div className="acc-info__name">{name}</div>
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
