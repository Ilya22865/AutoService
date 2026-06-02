import { useEffect, useState } from 'react';
import { getClientsApi, type ClientDto } from '../../api';

export default function Clients() {
  const [clients, setClients] = useState<ClientDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClientsApi.getClients()
      .then(setClients)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="emp-page"><p>Загрузка...</p></div>;

  return (
    <div className="emp-page">
      <div className="emp-page__header">
        <div>
          <h1>Клиенты</h1>
          <p>Всего клиентов: {clients.length}</p>
        </div>
      </div>
      <table className="emp-table">
        <thead>
          <tr>
            <th>Клиент</th>
            <th>Телефон</th>
            <th>Email</th>
            <th>Автомобили</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.email}>
              <td>
                <div className="emp-table__client">
                  <div className="emp-table__avatar">{client.fullName[0]}</div>
                  <span className="emp-table__name">{client.fullName}</span>
                </div>
              </td>
              <td>{client.phoneNumber ?? '—'}</td>
              <td>{client.email}</td>
              <td>{client.vehicles?.map(v => v.model).join(', ') || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
