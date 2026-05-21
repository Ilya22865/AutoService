import { useParams, Link } from 'react-router-dom';

const statuses = ['Ожидает', 'Подтверждён', 'В работе', 'Готов', 'Завершён', 'Отменён'];

const mockOrder = {
  id: 103,
  client: 'Анна Смирнова',
  phone: '+7 (934) 567-89-01',
  email: 'anna@example.com',
  car: 'Kia Rio 2021',
  vin: 'KNADN5123M1234567',
  service: 'Ремонт ходовой части',
  date: '18.05.2026',
  status: 'Ожидает',
  amount: '200 Br',
  comment: 'Стук в передней подвеске при повороте. Нужна диагностика и замена сайлентблоков.',
  items: [
    { name: 'Сайлентблок переднего рычага', qty: 2, price: '45 Br' },
    { name: 'Шаровая опора', qty: 2, price: '70 Br' },
    { name: 'Работа по замене', qty: 1, price: '110 Br' },
  ],
};

export default function OrderDetail() {
  const { id } = useParams();

  return (
    <div className="emp-page">
      <div className="emp-page__header">
        <div>
          <Link to="/employee/orders" className="emp-back">&larr; Назад к заказам</Link>
          <h1>Заказ #{id}</h1>
        </div>
        <div className="emp-order-status">
          <select className="emp-filter emp-filter--status" defaultValue={mockOrder.status}>
            {statuses.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button className="btn btn-primary">Сохранить</button>
        </div>
      </div>
      <div className="emp-order">
        <div className="emp-order__card">
          <h3>Информация о клиенте</h3>
          <div className="emp-order__info-grid">
            <div className="emp-order__field">
              <span className="emp-order__label">Имя</span>
              <span className="emp-order__value">{mockOrder.client}</span>
            </div>
            <div className="emp-order__field">
              <span className="emp-order__label">Телефон</span>
              <span className="emp-order__value">{mockOrder.phone}</span>
            </div>
            <div className="emp-order__field">
              <span className="emp-order__label">Email</span>
              <span className="emp-order__value">{mockOrder.email}</span>
            </div>
          </div>
        </div>
        <div className="emp-order__card">
          <h3>Информация об автомобиле</h3>
          <div className="emp-order__info-grid">
            <div className="emp-order__field">
              <span className="emp-order__label">Автомобиль</span>
              <span className="emp-order__value">{mockOrder.car}</span>
            </div>
            <div className="emp-order__field">
              <span className="emp-order__label">VIN</span>
              <span className="emp-order__value">{mockOrder.vin}</span>
            </div>
          </div>
        </div>
        <div className="emp-order__card">
          <h3>Детали заказа</h3>
          <table className="emp-table">
            <thead>
              <tr>
                <th>Наименование</th>
                <th>Кол-во</th>
                <th>Цена</th>
              </tr>
            </thead>
            <tbody>
              {mockOrder.items.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td className="emp-table__price">{item.price}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} className="emp-table__total-label">Итого</td>
                <td className="emp-table__price emp-table__total">{mockOrder.amount}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="emp-order__card">
          <h3>Комментарий клиента</h3>
          <p className="emp-order__comment">{mockOrder.comment}</p>
        </div>
        <div className="emp-order__card">
          <h3>Комментарий сотрудника</h3>
          <textarea className="emp-order__textarea" placeholder="Добавить комментарий..." rows={3} defaultValue="Проверить переднюю подвеску, возможна замена рычагов." />
        </div>
        <div className="emp-order__actions">
          <button className="btn btn-primary">Подтвердить заказ</button>
          <button className="btn btn-outline emp-btn-outline--dark">Отменить заказ</button>
        </div>
      </div>
    </div>
  );
}
