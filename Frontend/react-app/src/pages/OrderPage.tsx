import { useState } from 'react';

const serviceList = [
  { id: 1, name: 'Диагностика двигателя', price: 55 },
  { id: 2, name: 'Компьютерная диагностика', price: 45 },
  { id: 3, name: 'Замена масла и фильтров', price: 35 },
  { id: 4, name: 'Замена тормозных колодок', price: 80 },
  { id: 5, name: 'Ремонт ходовой части', price: 140 },
  { id: 6, name: 'Замена сайлентблоков', price: 95 },
  { id: 7, name: 'Ремонт двигателя', price: 200 },
  { id: 8, name: 'Замена ремня ГРМ', price: 120 },
  { id: 9, name: 'Ремонт кондиционера', price: 160 },
  { id: 10, name: 'Замена свечей зажигания', price: 40 },
];

const partsList = [
  { id: 1, name: 'Масло моторное 5W-40 4л', price: 85 },
  { id: 2, name: 'Фильтр масляный', price: 30 },
  { id: 3, name: 'Фильтр воздушный', price: 22 },
  { id: 4, name: 'Фильтр салона', price: 25 },
  { id: 5, name: 'Колодки тормозные передние', price: 120 },
  { id: 6, name: 'Колодки тормозные задние', price: 110 },
  { id: 7, name: 'Свеча зажигания', price: 15 },
  { id: 8, name: 'Ремень ГРМ', price: 65 },
  { id: 9, name: 'Сайлентблок переднего рычага', price: 45 },
  { id: 10, name: 'Шаровая опора', price: 70 },
  { id: 11, name: 'Амортизатор передний', price: 170 },
  { id: 12, name: 'Аккумулятор 60Ah', price: 200 },
];

type LineItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

export default function OrderPage() {
  const [selectedServices, setSelectedServices] = useState<LineItem[]>([]);
  const [selectedParts, setSelectedParts] = useState<LineItem[]>([]);
  const [serviceSearch, setServiceSearch] = useState('');
  const [partsSearch, setPartsSearch] = useState('');

  const addService = (s: typeof serviceList[0]) => {
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

  const addPart = (p: typeof partsList[0]) => {
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

  const total = [...selectedServices, ...selectedParts].reduce((sum, item) => sum + item.price * item.qty, 0);

  const filteredServices = serviceList.filter(s =>
    s.name.toLowerCase().includes(serviceSearch.toLowerCase())
  );
  const filteredParts = partsList.filter(p =>
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
                <input type="text" className="order-page__input" placeholder="Ваше имя" />
                <input type="tel" className="order-page__input" placeholder="Телефон" />
              </div>
              <div className="order-page__form-row">
                <input type="email" className="order-page__input" placeholder="Email" />
                <input type="text" className="order-page__input" placeholder="Адрес" />
              </div>
            </div>

            <div className="order-page__section">
              <h2>Информация об автомобиле</h2>
              <div className="order-page__form-row">
                <input type="text" className="order-page__input" placeholder="Марка и модель" />
                <input type="number" className="order-page__input" placeholder="Год выпуска" />
              </div>
              <div className="order-page__form-row">
                <input type="text" className="order-page__input" placeholder="VIN номер" />
                <input type="text" className="order-page__input" placeholder="Госномер" />
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
              <textarea className="order-page__textarea" placeholder="Опишите проблему или оставьте дополнительные пожелания..." rows={4} />
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

              <button className="btn btn-primary order-page__submit" onClick={() => alert('Заказ отправлен!')}>
                Оформить заказ
              </button>
              <p className="order-page__note">Наш менеджер свяжется с вами для подтверждения</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
