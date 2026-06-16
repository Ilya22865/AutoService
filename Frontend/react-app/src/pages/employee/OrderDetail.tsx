import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderStatusApi, orderApiExt, type OrderDto } from '../../api';

const statusLabels: Record<string, string> = {
    Pending: 'Ожидает',
    Confirmed: 'Подтверждён',
    InProgress: 'В работе',
    Ready: 'Готов',
    Completed: 'Завершён',
    Cancelled: 'Отменён',
};

const statuses = ['Pending', 'Confirmed', 'InProgress', 'Ready', 'Completed', 'Cancelled'];

export default function OrderDetail() {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<OrderDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [saving, setSaving] = useState(false);

    const load = () => {
        if (!id) return;
        setLoading(true);
        orderStatusApi.getOrder(Number(id))
            .then(d => {
                setOrder(d as unknown as OrderDto);
                setStatus(d.status);
            })
            .catch(e => setError(e instanceof Error ? e.message : 'Ошибка'))
            .finally(() => setLoading(false));
    };

    useEffect(load, [id]);

    const handleSaveStatus = async () => {
        if (!id) return;
        setSaving(true);
        try {
            await orderApiExt.updateStatus(Number(id), status);
            load();
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Ошибка');
        } finally {
            setSaving(false);
        }
    };

    const handleAssign = async () => {
        if (!id || !employeeId) return;
        setSaving(true);
        try {
            await orderApiExt.assignEmployee(Number(id), Number(employeeId));
            load();
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Ошибка');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="emp-page"><p>Загрузка...</p></div>;
    if (error) return <div className="emp-page"><p className="error">{error}</p></div>;
    if (!order) return null;

    const formatPrice = (n: number) => n.toLocaleString() + ' Br';

    return (
        <div className="emp-page">
            <div className="emp-page__header">
                <div>
                    <Link to="/employee/orders" className="emp-back">&larr; Назад к заказам</Link>
                    <h1>Заказ №{order.orderId}</h1>
                </div>
                <div className="emp-order-status">
                    <select className="emp-filter emp-filter--status" value={status} onChange={e => setStatus(e.target.value)}>
                        {statuses.map(s => (
                            <option key={s} value={s}>{statusLabels[s] || s}</option>
                        ))}
                    </select>
                    <button className="btn btn-primary" onClick={handleSaveStatus} disabled={saving}>
                        {saving ? '...' : 'Сохранить'}
                    </button>
                </div>
            </div>

            <div className="emp-order">
                <div className="emp-order__card">
                    <h3>Информация о клиенте</h3>
                    <div className="emp-order__info-grid">
                        <div className="emp-order__field">
                            <span className="emp-order__label">Имя</span>
                            <span className="emp-order__value">{order.client?.fullName || '—'}</span>
                        </div>
                        <div className="emp-order__field">
                            <span className="emp-order__label">Телефон</span>
                            <span className="emp-order__value">{order.client?.phoneNumber || '—'}</span>
                        </div>
                        <div className="emp-order__field">
                            <span className="emp-order__label">Email</span>
                            <span className="emp-order__value">{order.client?.email || '—'}</span>
                        </div>
                        <div className="emp-order__field">
                            <span className="emp-order__label">Адрес</span>
                            <span className="emp-order__value">{order.client?.address || '—'}</span>
                        </div>
                    </div>
                </div>

                <div className="emp-order__card">
                    <h3>Информация об автомобиле</h3>
                    <div className="emp-order__info-grid">
                        <div className="emp-order__field">
                            <span className="emp-order__label">Автомобиль</span>
                            <span className="emp-order__value">{order.vehicle?.model || '—'}</span>
                        </div>
                        <div className="emp-order__field">
                            <span className="emp-order__label">VIN</span>
                            <span className="emp-order__value">{order.vehicle?.vinNumber || '—'}</span>
                        </div>
                        <div className="emp-order__field">
                            <span className="emp-order__label">Госномер</span>
                            <span className="emp-order__value">{order.vehicle?.registrationNumber || '—'}</span>
                        </div>
                    </div>
                </div>

                <div className="emp-order__card">
                    <h3>Услуги</h3>
                    <table className="emp-table">
                        <thead>
                            <tr>
                                <th>Наименование</th>
                                <th>Кол-во</th>
                                <th>Цена</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.services.map((s, i) => (
                                <tr key={i}>
                                    <td>{s.serviceName}</td>
                                    <td>{s.quantity}</td>
                                    <td className="emp-table__price">{formatPrice(s.priceAtSale)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {order.details.length > 0 && (
                    <div className="emp-order__card">
                        <h3>Запчасти</h3>
                        <table className="emp-table">
                            <thead>
                                <tr>
                                    <th>Наименование</th>
                                    <th>Кол-во</th>
                                    <th>Цена</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.details.map((d, i) => (
                                    <tr key={i}>
                                        <td>{d.detailName}</td>
                                        <td>{d.quantity}</td>
                                        <td className="emp-table__price">{formatPrice(d.priceAtSale)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {order.comment && (
                    <div className="emp-order__card">
                        <h3>Комментарий клиента</h3>
                        <p className="emp-order__comment">{order.comment}</p>
                    </div>
                )}

                <div className="emp-order__card">
                    <h3>Назначить сотрудника</h3>
                    <div className="emp-order__assign">
                        {order.assignedEmployeeName && (
                            <p className="emp-order__field">
                                <span className="emp-order__label">Текущий сотрудник</span>
                                <span className="emp-order__value">{order.assignedEmployeeName}</span>
                            </p>
                        )}
                        <div className="emp-order__assign-row">
                            <input
                                type="number"
                                className="emp-order__input"
                                placeholder="ID сотрудника"
                                value={employeeId}
                                onChange={e => setEmployeeId(e.target.value)}
                            />
                            <button className="btn btn-primary" onClick={handleAssign} disabled={saving || !employeeId}>
                                Назначить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
