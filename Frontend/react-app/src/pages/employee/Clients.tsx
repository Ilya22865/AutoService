const clients = [
  { id: 1, name: 'Иван Петров', phone: '+7 (912) 345-67-89', email: 'ivan@example.com', car: 'Toyota Camry 2020', vin: 'JTNB23HKXK1234567', orders: 5, total: '800 Br' },
  { id: 2, name: 'Сергей Иванов', phone: '+7 (923) 456-78-90', email: 'sergey@example.com', car: 'BMW X5 2019', vin: 'WBAKS420X0G123456', orders: 3, total: '650 Br' },
  { id: 3, name: 'Анна Смирнова', phone: '+7 (934) 567-89-01', email: 'anna@example.com', car: 'Kia Rio 2021', vin: 'KNADN5123M1234567', orders: 2, total: '290 Br' },
  { id: 4, name: 'Дмитрий Козлов', phone: '+7 (945) 678-90-12', email: 'dmitry@example.com', car: 'Mazda CX-5 2020', vin: 'JMZER852300123456', orders: 7, total: '1 300 Br' },
  { id: 5, name: 'Ольга Новикова', phone: '+7 (956) 789-01-23', email: 'olga@example.com', car: 'Renault Logan 2018', vin: 'X7LLSR52H8H123456', orders: 1, total: '35 Br' },
  { id: 6, name: 'Павел Соколов', phone: '+7 (967) 890-12-34', email: 'pavel@example.com', car: 'Hyundai Tucson 2022', vin: 'KM8JN3DD6MU123456', orders: 4, total: '520 Br' },
];

export default function Clients() {
  return (
    <div className="emp-page">
      <div className="emp-page__header">
        <div>
          <h1>Клиенты</h1>
          <p>Всего клиентов: {clients.length}</p>
        </div>
        <div className="emp-page__filters">
          <input type="text" className="emp-filter emp-filter--search" placeholder="Поиск по имени или телефону..." />
        </div>
      </div>
      <table className="emp-table">
        <thead>
          <tr>
            <th>Клиент</th>
            <th>Телефон</th>
            <th>Email</th>
            <th>Автомобиль</th>
            <th>VIN</th>
            <th>Заказов</th>
            <th>Сумма</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>
                <div className="emp-table__client">
                  <div className="emp-table__avatar">{client.name[0]}</div>
                  <span className="emp-table__name">{client.name}</span>
                </div>
              </td>
              <td>{client.phone}</td>
              <td>{client.email}</td>
              <td>{client.car}</td>
              <td className="emp-table__vin">{client.vin}</td>
              <td>{client.orders}</td>
              <td className="emp-table__price">{client.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
