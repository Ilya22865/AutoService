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
              PitStop — это современный автосервис полного цикла в городе Витебск. 
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
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none"></svg>  
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
