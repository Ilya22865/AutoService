import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderApi, catalogApi } from '../api';

type LineItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

type CatalogItem = { id: number; name: string; price: number };

export default function OrderPage() {
  const navigate = useNavigate();
  const [services, setServices] = useState<CatalogItem[]>([]);
  const [parts, setParts] = useState<CatalogItem[]>([]);
  const [selectedServices, setSelectedServices] = useState<LineItem[]>([]);
  const [selectedParts, setSelectedParts] = useState<LineItem[]>([]);
  const [serviceSearch, setServiceSearch] = useState('');
  const [partsSearch, setPartsSearch] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [vin, setVin] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successId, setSuccessId] = useState<number | null>(null);

  useEffect(() => {
    catalogApi.getServices().then(data =>
      setServices(data.map(s => ({ id: s.id, name: s.name, price: s.price })))
    ).catch(() => {});
    catalogApi.getDetails().then(data =>
      setParts(data.map(d => ({ id: d.id, name: d.name, price: d.price })))
    ).catch(() => {});
  }, []);

  const addService = (s: CatalogItem) => {
    setSelectedServices(prev => {
      const existing = prev.find(item => item.id === s.id);
      if (existing) {
        return prev.map(item =>
          item.id === s.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: s.id, name: s.name, price: s.price, qty: 1 }];
    });
  };

  const removeService = (id: number) => {
    setSelectedServices(prev => prev.filter(item => item.id !== id));
  };

  const updateServiceQty = (id: number, qty: number) => {
    if (qty < 1) return removeService(id);
    setSelectedServices(prev =>
      prev.map(item => (item.id === id ? { ...item, qty } : item))
    );
  };

  const addPart = (p: CatalogItem) => {
    setSelectedParts(prev => {
      const existing = prev.find(item => item.id === p.id);
      if (existing) {
        return prev.map(item =>
          item.id === p.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: p.id, name: p.name, price: p.price, qty: 1 }];
    });
  };

  const removePart = (id: number) => {
    setSelectedParts(prev => prev.filter(item => item.id !== id));
  };

  const updatePartQty = (id: number, qty: number) => {
    if (qty < 1) return removePart(id);
    setSelectedParts(prev =>
      prev.map(item => (item.id === id ? { ...item, qty } : item))
    );
  };

  const phoneRegex = /^[\+\d\s\-\(\)]{7,20}$/;

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessId(null);

    if (!phoneRegex.test(phone)) {
      setError('Укажите корректный номер телефона');
      setLoading(false);
      return;
    }

    if (!email) {
      setError('Укажите email');
      setLoading(false);
      return;
    }

    if (selectedServices.length === 0 && selectedParts.length === 0) {
      setError('Добавьте хотя бы одну услугу или деталь');
      setLoading(false);
      return;
    }

    try {
      const data = await orderApi.createOrder({
        comment: comment || undefined,
        vehicle: vin ? {
          model,
          year: Number(year) || 0,
          vinNumber: vin,
          registrationNumber: regNumber,
        } : undefined,
        services: selectedServices.map(s => ({
          serviceName: s.name,
          priceAtSale: s.price,
          quantity: s.qty,
          serviceDescription: undefined,
        })),
        details: selectedParts.map(p => ({
          detailName: p.name,
          quantity: p.qty,
          priceAtSale: p.price,
          detailDescription: undefined,
        })),
      });
      setSuccessId(data.id);
      setSelectedServices([]);
      setSelectedParts([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при создании заказа');
    } finally {
      setLoading(false);
    }
  };

  const total = [...selectedServices, ...selectedParts].reduce((sum, item) => sum + item.price * item.qty, 0);

  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(serviceSearch.toLowerCase())
  );
  const filteredParts = parts.filter(p =>
    p.name.toLowerCase().includes(partsSearch.toLowerCase())
  );

  const formatPrice = (n: number) => n.toLocaleString() + ' Br';

  return (
    <div className="order-page">
      <div className="container">
        <div className="order-page__header">
          <h1>Оформление заказа</h1>
          <p>Выберите услуги и запчасти для ремонта вашего автомобиля</p>
        </div>

        <div className="order-page__layout">
          <div className="order-page__left">
            <div className="order-page__section">
              <h2>Информация о клиенте</h2>
              <div className="order-page__form-row">
                <input type="text" className="order-page__input" placeholder="Ваше имя" value={name} onChange={e => setName(e.target.value)} />
                <input type="tel" className="order-page__input" placeholder="Телефон" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div className="order-page__form-row">
                <input type="email" className="order-page__input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="text" className="order-page__input" placeholder="Адрес" value={address} onChange={e => setAddress(e.target.value)} />
              </div>
            </div>

            <div className="order-page__section">
              <h2>Информация об автомобиле</h2>
              <div className="order-page__form-row">
                <input type="text" className="order-page__input" placeholder="Марка и модель" value={model} onChange={e => setModel(e.target.value)} />
                <input type="number" className="order-page__input" placeholder="Год выпуска" value={year} onChange={e => setYear(e.target.value)} />
              </div>
              <div className="order-page__form-row">
                <input type="text" className="order-page__input" placeholder="VIN номер" value={vin} onChange={e => setVin(e.target.value)} />
                <input type="text" className="order-page__input" placeholder="Госномер" value={regNumber} onChange={e => setRegNumber(e.target.value)} />
              </div>
            </div>

            <div className="order-page__section">
              <h2>Выберите услуги</h2>
              <input
                type="text"
                className="order-page__search"
                placeholder="Поиск услуг..."
                value={serviceSearch}
                onChange={e => setServiceSearch(e.target.value)}
              />
              <div className="order-page__select-list">
                {filteredServices.map(s => {
                  const added = selectedServices.find(item => item.id === s.id);
                  return (
                    <div key={s.id} className={`order-page__select-item ${added ? 'added' : ''}`}>
                      <div className="order-page__select-info">
                        <span className="order-page__select-name">{s.name}</span>
                        <span className="order-page__select-price">{formatPrice(s.price)}</span>
                      </div>
                      {added ? (
                        <div className="order-page__qty-control">
                          <button className="order-page__qty-btn" onClick={() => updateServiceQty(s.id, added.qty - 1)}>−</button>
                          <span className="order-page__qty">{added.qty}</span>
                          <button className="order-page__qty-btn" onClick={() => updateServiceQty(s.id, added.qty + 1)}>+</button>
                          <button className="order-page__remove-btn" onClick={() => removeService(s.id)}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                              <path d="M3 3l8 8M11 3l-8 8"/>
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <button className="order-page__add-btn" onClick={() => addService(s)}>Добавить</button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="order-page__section">
              <h2>Выберите запчасти</h2>
              <input
                type="text"
                className="order-page__search"
                placeholder="Поиск запчастей..."
                value={partsSearch}
                onChange={e => setPartsSearch(e.target.value)}
              />
              <div className="order-page__select-list">
                {filteredParts.map(p => {
                  const added = selectedParts.find(item => item.id === p.id);
                  return (
                    <div key={p.id} className={`order-page__select-item ${added ? 'added' : ''}`}>
                      <div className="order-page__select-info">
                        <span className="order-page__select-name">{p.name}</span>
                        <span className="order-page__select-price">{formatPrice(p.price)}</span>
                      </div>
                      {added ? (
                        <div className="order-page__qty-control">
                          <button className="order-page__qty-btn" onClick={() => updatePartQty(p.id, added.qty - 1)}>−</button>
                          <span className="order-page__qty">{added.qty}</span>
                          <button className="order-page__qty-btn" onClick={() => updatePartQty(p.id, added.qty + 1)}>+</button>
                          <button className="order-page__remove-btn" onClick={() => removePart(p.id)}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                              <path d="M3 3l8 8M11 3l-8 8"/>
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <button className="order-page__add-btn" onClick={() => addPart(p)}>Добавить</button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="order-page__section">
              <h2>Комментарий</h2>
              <textarea className="order-page__textarea" placeholder="Опишите проблему или оставьте дополнительные пожелания..." rows={4} value={comment} onChange={e => setComment(e.target.value)} />
            </div>
          </div>

          <div className="order-page__right">
            <div className="order-page__summary">
              <h3>Ваш заказ</h3>

              {selectedServices.length === 0 && selectedParts.length === 0 && (
                <p className="order-page__empty">Ничего не выбрано</p>
              )}

              {selectedServices.length > 0 && (
                <div className="order-page__summary-group">
                  <h4>Услуги</h4>
                  {selectedServices.map(item => (
                    <div key={item.id} className="order-page__summary-item">
                      <span className="order-page__summary-name">{item.name}</span>
                      <div className="order-page__summary-right">
                        <span className="order-page__summary-qty">{item.qty} × {formatPrice(item.price)}</span>
                        <span className="order-page__summary-price">{formatPrice(item.price * item.qty)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedParts.length > 0 && (
                <div className="order-page__summary-group">
                  <h4>Запчасти</h4>
                  {selectedParts.map(item => (
                    <div key={item.id} className="order-page__summary-item">
                      <span className="order-page__summary-name">{item.name}</span>
                      <div className="order-page__summary-right">
                        <span className="order-page__summary-qty">{item.qty} × {formatPrice(item.price)}</span>
                        <span className="order-page__summary-price">{formatPrice(item.price * item.qty)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="order-page__summary-total">
                <span>Итого</span>
                <span className="order-page__summary-total-price">{formatPrice(total)}</span>
              </div>

              {error && <div className="order-page__error">{error}</div>}

              {successId ? (
                <div className="order-page__success">
                  <h4>Заказ #{successId} создан!</h4>
                  <p>Наш менеджер свяжется с вами для подтверждения</p>
                  <button className="btn btn-primary order-page__submit" onClick={() => navigate('/account')}>
                    Перейти к заказам
                  </button>
                </div>
              ) : (
                <>
                  <button className="btn btn-primary order-page__submit" onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Отправка...' : 'Оформить заказ'}
                  </button>
                  <p className="order-page__note">Наш менеджер свяжется с вами для подтверждения</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
