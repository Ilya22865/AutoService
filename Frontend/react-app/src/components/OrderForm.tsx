import { useState, useEffect } from 'react';
import { catalogApi } from '../api';

type CatalogItem = { id: number; name: string; price: number }
export default function OrderForm() {
    const [services, setServices] = useState<CatalogItem[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            try {
                const raw = atob(token.split('.')[1]);
                const utf8 = decodeURIComponent(escape(raw));
                const payload = JSON.parse(utf8);
                const n = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || payload.unique_name || payload.name;
                const e = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || payload.email;
                if (n) setName(n);
                if (e) setEmail(e);
            } catch {
                localStorage.removeItem('token');
            }
        }
        catalogApi.getServices().then(data =>
            setServices(data.map(s => ({ id: s.id, name: s.name, price: s.price })))
        ).catch(() => {});
    }, [])

  return (
    <section id="order" className="section order">
      <div className="container">
        <div className="order__card">
          <div className="order__info">
            <h2>Записаться на ремонт</h2>
            <p className="order__subtitle">
              Оставьте заявку, и мы свяжемся с вами в ближайшее время 
              для уточнения деталей
            </p>
            <div className="order__benefits">
              <div className="order__benefit">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#d4332a" strokeWidth="2"/>
                  <path d="M8 12l3 3 5-5" stroke="#d4332a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Бесплатная диагностика</span>
              </div>
              <div className="order__benefit">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#d4332a" strokeWidth="2"/>
                  <path d="M8 12l3 3 5-5" stroke="#d4332a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Гарантия 2 года</span>
              </div>
              <div className="order__benefit">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#d4332a" strokeWidth="2"/>
                  <path d="M8 12l3 3 5-5" stroke="#d4332a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Ремонт в день обращения</span>
              </div>
            </div>
          </div>
          <form className="order__form" onSubmit={e => e.preventDefault()}>
            <div className="order__form-row">
              <input type="text" placeholder="Ваше имя" className="order__input" value={name} onChange={e => setName(e.target.value)} />
              <input type="email" placeholder="Email" className="order__input" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="order__form-row">
              <input type="text" placeholder="Марка и модель авто" className="order__input" />
              <input type="number" placeholder="Год выпуска" className="order__input" />
            </div>
            <select className="order__select">
              <option value="">Выберите услугу</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.name} — {s.price} Br</option>
              ))}
            </select>
            <textarea className="order__textarea" placeholder="Опишите проблему" rows={3} />
            <button type="submit" className="btn btn-primary order__submit">
              Отправить заявку
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
