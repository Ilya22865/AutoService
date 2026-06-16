import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderStatusApi, type OrderStatusDto } from '../api';

const statusLabels: Record<string, { label: string; color: string }> = {
    Pending: { label: 'В обработке', color: '#f59e0b' },
    Completed: { label: 'Выполнен', color: '#10b981' },
    Cancelled: { label: 'Отменён', color: '#ef4444' },
};

export default function OrderStatus() {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<OrderStatusDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError('');
        orderStatusApi.getOrder(Number(id))
            .then(data => setOrder(data))
            .catch(err => setError(err instanceof Error ? err.message : 'Ошибка загрузки'))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="order-status-page">
                <div className="container">
                    <p className="order-status__loading">Загрузка...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="order-status-page">
                <div className="container">
                    <div className="order-status__error">
                        <h2>Заказ не найден</h2>
                        <p>{error}</p>
                        <Link to="/" className="btn btn-primary">На главную</Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!order) return null;

    const st = statusLabels[order.status] || { label: order.status, color: '#6b7280' };

    const formatPrice = (n: number) => n.toLocaleString() + ' Br';

    return (
        <div className="order-status-page">
            <div className="container">
                <div className="order-status__card">
                    <div className="order-status__header">
                        <h1>Заказ №{order.orderId}</h1>
                        <span
                            className="order-status__badge"
                            style={{ background: st.color }}
                        >
                            {st.label}
                        </span>
                    </div>

                    {order.createdAt && (
                        <p className="order-status__date">
                            Создан: {new Date(order.createdAt).toLocaleDateString('ru-RU', {
                                day: 'numeric', month: 'long', year: 'numeric',
                                hour: '2-digit', minute: '2-digit'
                            })}
                        </p>
                    )}

                    {order.scheduledDate && (
                        <p className="order-status__date">
                            Запись на: {new Date(order.scheduledDate).toLocaleDateString('ru-RU', {
                                day: 'numeric', month: 'long', year: 'numeric',
                                hour: '2-digit', minute: '2-digit'
                            })}
                        </p>
                    )}

                    {order.assignedEmployeeName && (
                        <p className="order-status__date">
                            Сотрудник: {order.assignedEmployeeName}
                        </p>
                    )}

                    {order.client && (
                        <div className="order-status__section">
                            <h3>Клиент</h3>
                            <p><strong>{order.client.fullName}</strong></p>
                            <p>{order.client.email}</p>
                            {order.client.phoneNumber && <p>{order.client.phoneNumber}</p>}
                            {order.client.address && <p>{order.client.address}</p>}
                        </div>
                    )}

                    {order.vehicle && (
                        <div className="order-status__section">
                            <h3>Автомобиль</h3>
                            <p><strong>{order.vehicle.model}</strong> ({order.vehicle.year})</p>
                            {order.vehicle.vinNumber && <p>VIN: {order.vehicle.vinNumber}</p>}
                            {order.vehicle.registrationNumber && <p>Госномер: {order.vehicle.registrationNumber}</p>}
                        </div>
                    )}

                    {order.services.length > 0 && (
                        <div className="order-status__section">
                            <h3>Услуги</h3>
                            <table className="order-status__table">
                                <thead>
                                    <tr>
                                        <th>Услуга</th>
                                        <th>Кол-во</th>
                                        <th>Цена</th>
                                        <th>Сумма</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.services.map((s, i) => (
                                        <tr key={i}>
                                            <td>{s.serviceName}</td>
                                            <td>{s.quantity}</td>
                                            <td>{formatPrice(s.priceAtSale)}</td>
                                            <td>{formatPrice(s.totalPrice)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {order.details.length > 0 && (
                        <div className="order-status__section">
                            <h3>Запчасти</h3>
                            <table className="order-status__table">
                                <thead>
                                    <tr>
                                        <th>Деталь</th>
                                        <th>Кол-во</th>
                                        <th>Цена</th>
                                        <th>Сумма</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.details.map((d, i) => (
                                        <tr key={i}>
                                            <td>{d.detailName}</td>
                                            <td>{d.quantity}</td>
                                            <td>{formatPrice(d.priceAtSale)}</td>
                                            <td>{formatPrice(d.totalPrice)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {order.totalAmount != null && (
                        <div className="order-status__total">
                            <span>Итого</span>
                            <span className="order-status__total-price">{formatPrice(order.totalAmount)}</span>
                        </div>
                    )}

                    {order.comment && (
                        <div className="order-status__section">
                            <h3>Комментарий</h3>
                            <p className="order-status__comment">{order.comment}</p>
                        </div>
                    )}

                    <div className="order-status__actions">
                        <Link to="/" className="btn btn-primary">На главную</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
