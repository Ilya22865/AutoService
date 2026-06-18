import { useEffect, useState } from 'react';
import { getOrdersApi, type OrderDto } from '../../api';

const statusMap: Record<string, string> = {
  'Pending': 'yellow',
  'Completed': 'green',
  'Cancelled': 'red',
};

const statusLabel: Record<string, string> = {
  'Pending': 'Ожидает',
  'Completed': 'Завершён',
  'Cancelled': 'Отменён',
};

export default function Dashboard() {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrdersApi.getOrders()
      .then(data => setOrders(data.toReversed()))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const recentOrders = orders.slice(0, 6);
  const totalToday = orders.length;
  const inWork = orders.filter(o => o.status === 'Pending').length;
  const completed = orders.filter(o => o.status === 'Completed').length;

  return (
    <div className="emp-page">
      <div className="emp-page__header">
        <h1>Дашборд</h1>
        <p>Обзор работы автосервиса</p>
        <button className="btn btn-primary" style={{ marginLeft: 'auto' }}
          onClick={() => {
            const token = localStorage.getItem('token');
            if (!token) return alert('Вы не авторизованы');
            fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5130/api'}/log/download`, {
              headers: { 'Authorization': `Bearer ${token}` }
            })
              .then(r => { if (!r.ok) throw new Error('Server returned ' + r.status); return r.blob(); })
              .then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = 'logs.txt'; a.click();
                URL.revokeObjectURL(url);
                setTimeout(() => URL.revokeObjectURL(url), 1000);
              })
              .catch(e => alert('Ошибка: ' + e.message));
          }}>Скачать логи</button>
      </div>
      <div className="emp-stats">
        <div className="emp-stat">
          <div className="emp-stat__icon emp-stat__icon--blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="emp-stat__info">
            <span className="emp-stat__value">{totalToday}</span>
            <span className="emp-stat__label">Всего заказов</span>
          </div>
        </div>
        <div className="emp-stat">
          <div className="emp-stat__icon emp-stat__icon--green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="emp-stat__info">
            <span className="emp-stat__value">{completed}</span>
            <span className="emp-stat__label">Завершено</span>
          </div>
        </div>
        <div className="emp-stat">
          <div className="emp-stat__icon emp-stat__icon--yellow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="emp-stat__info">
            <span className="emp-stat__value">{inWork}</span>
            <span className="emp-stat__label">В работе</span>
          </div>
        </div>
      </div>
      <div className="emp-page__section">
        <h2>Последние заказы</h2>
        {loading ? (
          <p>Загрузка...</p>
        ) : (
          <table className="emp-table">
            <thead>
              <tr>
                <th>№</th>
                <th>Клиент</th>
                <th>Автомобиль</th>
                <th>Услуги</th>
                <th>Статус</th>
                <th>Сумма</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.orderId}>
                  <td>#{order.orderId}</td>
                  <td>{order.client?.fullName ?? '—'}</td>
                  <td>{order.vehicle ? `${order.vehicle.model}` : '—'}</td>
                  <td>{order.services.map(s => s.serviceName).join(', ')}</td>
                  <td><span className={`emp-badge emp-badge--${statusMap[order.status] ?? 'gray'}`}>{statusLabel[order.status] ?? order.status}</span></td>
                  <td className="emp-table__price">{order.services.reduce((s, x) => s + x.priceAtSale * x.quantity, 0) + order.details.reduce((s, x) => s + x.priceAtSale * x.quantity, 0)} Br</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
