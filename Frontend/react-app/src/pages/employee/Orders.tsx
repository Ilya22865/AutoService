import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrdersApi, type OrderDto } from '../../api';

const statusMap: Record<string, { label: string; color: string }> = {
  'Pending': { label: 'Ожидает', color: 'yellow' },
  'Completed': { label: 'Завершён', color: 'green' },
  'Cancelled': { label: 'Отменён', color: 'red' },
};

export default function Orders() {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrdersApi.getOrders()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="emp-page"><p>Загрузка...</p></div>;

  return (
    <div className="emp-page">
      <div className="emp-page__header">
        <div>
          <h1>Заказы</h1>
          <p>Всего заказов: {orders.length}</p>
        </div>
      </div>
      <table className="emp-table">
        <thead>
          <tr>
            <th>№ заказа</th>
            <th>Клиент</th>
            <th>Автомобиль</th>
            <th>Услуги</th>
            <th>Статус</th>
            <th>Сумма</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => {
            const st = statusMap[order.status] ?? { label: order.status, color: 'gray' };
            return (
              <tr key={order.orderId}>
                <td className="emp-table__id">#{order.orderId}</td>
                <td>
                  <div className="emp-table__client">
                    <span className="emp-table__name">{order.client?.fullName ?? '—'}</span>
                  </div>
                </td>
                <td>{order.vehicle ? `${order.vehicle.model} (${order.vehicle.vinNumber})` : '—'}</td>
                <td>{order.services.map(s => s.serviceName).join(', ')}</td>
                <td><span className={`emp-badge emp-badge--${st.color}`}>{st.label}</span></td>
                <td className="emp-table__price">{order.services.reduce((s, x) => s + x.priceAtSale * x.quantity, 0) + order.details.reduce((s, x) => s + x.priceAtSale * x.quantity, 0)} Br</td>
                <td>
                  <Link to={`/employee/orders/${order.orderId}`} className="emp-btn-icon" title="Подробнее">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 4l4 4-4 4"/>
                    </svg>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
