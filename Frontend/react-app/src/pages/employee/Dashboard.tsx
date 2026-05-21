export default function Dashboard() {
  return (
    <div className="emp-page">
      <div className="emp-page__header">
        <h1>Дашборд</h1>
        <p>Обзор работы автосервиса за сегодня</p>
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
            <span className="emp-stat__value">8</span>
            <span className="emp-stat__label">Заказов сегодня</span>
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
            <span className="emp-stat__value">12</span>
            <span className="emp-stat__label">В работе</span>
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
            <span className="emp-stat__value">3</span>
            <span className="emp-stat__label">Ожидают подтверждения</span>
          </div>
        </div>
        <div className="emp-stat">
          <div className="emp-stat__icon emp-stat__icon--red">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="emp-stat__info">
            <span className="emp-stat__value">2</span>
            <span className="emp-stat__label">Просрочено</span>
          </div>
        </div>
      </div>
      <div className="emp-page__section">
        <h2>Последние заказы</h2>
        <table className="emp-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Клиент</th>
              <th>Автомобиль</th>
              <th>Услуга</th>
              <th>Статус</th>
              <th>Сумма</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: '101', client: 'Иван Петров', car: 'Toyota Camry 2020', service: 'Диагностика', status: 'В работе', amount: '55 Br' },
              { id: '102', client: 'Сергей Иванов', car: 'BMW X5 2019', service: 'Замена масла', status: 'Готов', amount: '90 Br' },
              { id: '103', client: 'Анна Смирнова', car: 'Kia Rio 2021', service: 'Ремонт ходовой', status: 'Ожидает', amount: '200 Br' },
            ].map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.client}</td>
                <td>{order.car}</td>
                <td>{order.service}</td>
                <td><span className={`emp-badge emp-badge--${order.status === 'Готов' ? 'green' : order.status === 'В работе' ? 'blue' : 'yellow'}`}>{order.status}</span></td>
                <td className="emp-table__price">{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="emp-page__section">
        <h2>Новые клиенты</h2>
        <div className="emp-clients-mini">
          {[
            { name: 'Алексей Кузнецов', phone: '+7 (912) 345-67-89', car: 'Honda Civic' },
            { name: 'Мария Васильева', phone: '+7 (923) 456-78-90', car: 'Skoda Octavia' },
          ].map((c, i) => (
            <div key={i} className="emp-client-mini">
              <div className="emp-client-mini__avatar">{c.name[0]}</div>
              <div className="emp-client-mini__info">
                <span className="emp-client-mini__name">{c.name}</span>
                <span className="emp-client-mini__detail">{c.phone} · {c.car}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
