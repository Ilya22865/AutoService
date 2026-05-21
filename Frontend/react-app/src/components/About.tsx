export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about__grid">
          <div className="about__content">
            <div className="section-title" style={{ textAlign: 'left' }}>
              <h2>О нашем автосервисе</h2>
            </div>
            <p>
              PitStop — это современный автосервис полного цикла в городе Тавима. 
              Мы предлагаем профессиональный ремонт и обслуживание автомобилей 
              любых марок и моделей.
            </p>
            <p>
              Наша команда — это сертифицированные мастера с многолетним опытом 
              работы. Мы используем только профессиональное диагностическое 
              оборудование и качественные запчасти.
            </p>
            <ul className="about__list">
              <li>Гарантия на все виды работ до 2 лет</li>
              <li>Оригинальные запчасти от проверенных поставщиков</li>
              <li>Бесплатная диагностика при записи на ремонт</li>
              <li>Срочный ремонт в день обращения</li>
              <li>Удобное расположение и парковка</li>
              <li>Отчёт о проделанной работе с фото</li>
            </ul>
          </div>
          <div className="about__image">
            <div className="about__image-placeholder">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="38" stroke="#d4332a" strokeWidth="2" opacity="0.3"/>
                <rect x="24" y="20" width="32" height="40" rx="6" stroke="#d4332a" strokeWidth="2" fill="#d4332a" fillOpacity="0.05"/>
                <circle cx="34" cy="48" r="4" stroke="#d4332a" strokeWidth="2"/>
                <circle cx="46" cy="48" r="4" stroke="#d4332a" strokeWidth="2"/>
                <path d="M34 30l-4 8h20l-4-8H34z" fill="#d4332a" opacity="0.1" stroke="#d4332a" strokeWidth="1.5"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
