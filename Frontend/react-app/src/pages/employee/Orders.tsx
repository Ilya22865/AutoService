import { Link } from 'react-router-dom';

const orders = [
  { id: 101, client: 'Иван Петров', car: 'Toyota Camry 2020', phone: '+7 (912) 345-67-89', service: 'Диагностика двигателя', date: '19.05.2026', status: 'В работе', amount: '55 Br' },
  { id: 102, client: 'Сергей Иванов', car: 'BMW X5 2019', phone: '+7 (923) 456-78-90', service: 'Замена масла и фильтров', date: '19.05.2026', status: 'Готов', amount: '90 Br' },
  { id: 103, client: 'Анна Смирнова', car: 'Kia Rio 2021', phone: '+7 (934) 567-89-01', service: 'Ремонт ходовой части', date: '18.05.2026', status: 'Ожидает', amount: '200 Br' },
  { id: 104, client: 'Дмитрий Козлов', car: 'Mazda CX-5 2020', phone: '+7 (945) 678-90-12', service: 'Замена тормозных колодок', date: '18.05.2026', status: 'Подтверждён', amount: '75 Br' },
  { id: 105, client: 'Ольга Новикова', car: 'Renault Logan 2018', phone: '+7 (956) 789-01-23', service: 'Компьютерная диагностика', date: '17.05.2026', status: 'Завершён', amount: '35 Br' },
  { id: 106, client: 'Павел Соколов', car: 'Hyundai Tucson 2022', phone: '+7 (967) 890-12-34', service: 'Ремонт кондиционера', date: '17.05.2026', status: 'Ожидает', amount: '150 Br' },
];

const statusColor: Record<string, string> = {
  'Ожидает': 'yellow',
  'Подтверждён': 'blue',
  'В работе': 'blue',
  'Готов': 'green',
  'Завершён': 'green',
  'Отменён': 'red',
};

export default function Orders() {
  return (
    <div className="emp-page">
      <div className="emp-page__header">
        <div>
          <h1>Заказы</h1>
          <p>Всего заказов: {orders.length}</p>
        </div>
        <div className="emp-page__filters">
          <select className="emp-filter">
            <option value="">Все статусы</option>
            <option>Ожидает</option>
            <option>Подтверждён</option>
            <option>В работе</option>
            <option>Готов</option>
            <option>Завершён</option>
            <option>Отменён</option>
          </select>
          <input type="text" className="emp-filter emp-filter--search" placeholder="Поиск по номеру или клиенту..." />
        </div>
      </div>
      <table className="emp-table">
        <thead>
          <tr>
            <th>№ заказа</th>
            <th>Клиент</th>
            <th>Автомобиль</th>
            <th>Услуга</th>
            <th>Дата</th>
            <th>Статус</th>
            <th>Сумма</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="emp-table__id">#{order.id}</td>
              <td>
                <div className="emp-table__client">
                  <span className="emp-table__name">{order.client}</span>
                  <span className="emp-table__phone">{order.phone}</span>
                </div>
              </td>
              <td>{order.car}</td>
              <td>{order.service}</td>
              <td>{order.date}</td>
              <td><span className={`emp-badge emp-badge--${statusColor[order.status] || 'gray'}`}>{order.status}</span></td>
              <td className="emp-table__price">{order.amount}</td>
              <td>
                <Link to={`/employee/orders/${order.id}`} className="emp-btn-icon" title="Подробнее">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 4l4 4-4 4"/>
                  </svg>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
