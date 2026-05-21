export default function OrderForm() {
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
              <input type="text" placeholder="Ваше имя" className="order__input" required />
              <input type="tel" placeholder="Телефон" className="order__input" required />
            </div>
            <div className="order__form-row">
              <input type="text" placeholder="Марка и модель авто" className="order__input" />
              <input type="number" placeholder="Год выпуска" className="order__input" />
            </div>
            <select className="order__select">
              <option value="">Выберите услугу</option>
              <option>Диагностика</option>
              <option>Ремонт двигателя</option>
              <option>Ремонт ходовой</option>
              <option>Техобслуживание</option>
              <option>Ремонт электрики</option>
              <option>Кузовной ремонт</option>
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
