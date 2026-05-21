export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__bg" />
      <div className="container hero__inner">
        <h1 className="hero__title">
          Профессиональный<br />автосервис в Витебске
        </h1>
        <p className="hero__desc">
          Полный спектр услуг по ремонту и обслуживанию автомобилей. 
          Оригинальные запчасти, гарантия на работы, опытные мастера.
        </p>
        <div className="hero__actions">
          <a href="#order" className="btn btn-primary">Записаться на ремонт</a>
          <a href="#services" className="btn btn-outline">Наши услуги</a>
        </div>
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">15+</span>
            <span className="hero__stat-label">Лет опыта</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">5000+</span>
            <span className="hero__stat-label">Отремонтировано авто</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">98%</span>
            <span className="hero__stat-label">Довольных клиентов</span>
          </div>
        </div>
      </div>
    </section>
  );
}
