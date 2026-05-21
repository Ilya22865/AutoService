const services = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" stroke="#d4332a" strokeWidth="2"/>
        <path d="M16 28l8-14 8 14H16z" fill="#d4332a" opacity="0.2"/>
        <path d="M16 28l8-14 8 14H16z" stroke="#d4332a" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="24" cy="28" r="3" fill="#d4332a"/>
      </svg>
    ),
    title: 'Диагностика',
    desc: 'Компьютерная диагностика всех систем автомобиля. Выявление неисправностей на ранней стадии.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="10" y="16" width="28" height="20" rx="3" stroke="#d4332a" strokeWidth="2" fill="#d4332a" fillOpacity="0.1"/>
        <circle cx="18" cy="36" r="4" stroke="#d4332a" strokeWidth="2"/>
        <circle cx="30" cy="36" r="4" stroke="#d4332a" strokeWidth="2"/>
        <path d="M10 24h28" stroke="#d4332a" strokeWidth="2"/>
      </svg>
    ),
    title: 'Ремонт двигателя',
    desc: 'Капитальный и текущий ремонт двигателей любых марок. Диагностика, замена запчастей.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="12" y="10" width="24" height="28" rx="4" stroke="#d4332a" strokeWidth="2" fill="#d4332a" fillOpacity="0.1"/>
        <circle cx="20" cy="30" r="3" stroke="#d4332a" strokeWidth="2"/>
        <circle cx="28" cy="30" r="3" stroke="#d4332a" strokeWidth="2"/>
        <path d="M20 18h8" stroke="#d4332a" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Ходовая часть',
    desc: 'Ремонт и замена элементов подвески, амортизаторов, шаровых опор, рулевых тяг.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" stroke="#d4332a" strokeWidth="2" fill="#d4332a" fillOpacity="0.1"/>
        <path d="M24 14v10l6 6" stroke="#d4332a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 24h4" stroke="#d4332a" strokeWidth="2" strokeLinecap="round"/>
        <path d="M30 24h4" stroke="#d4332a" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 14v-2" stroke="#d4332a" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 36v-2" stroke="#d4332a" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Техобслуживание',
    desc: 'Регламентное ТО, замена масла, фильтров, свечей, ремней ГРМ и жидкостей.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="14" y="12" width="20" height="24" rx="2" stroke="#d4332a" strokeWidth="2" fill="#d4332a" fillOpacity="0.1"/>
        <circle cx="24" cy="24" r="6" stroke="#d4332a" strokeWidth="2"/>
        <path d="M24 18v6l3 3" stroke="#d4332a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 36l-2 4" stroke="#d4332a" strokeWidth="2" strokeLinecap="round"/>
        <path d="M32 36l2 4" stroke="#d4332a" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Электрика',
    desc: 'Ремонт электрооборудования, замена генераторов, стартеров, проводки, АКБ.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M16 14l-4 10h24l-4-10H16z" stroke="#d4332a" strokeWidth="2" fill="#d4332a" fillOpacity="0.1" strokeLinejoin="round"/>
        <rect x="8" y="24" width="32" height="14" rx="2" stroke="#d4332a" strokeWidth="2" fill="#d4332a" fillOpacity="0.1"/>
        <circle cx="16" cy="35" r="3" stroke="#d4332a" strokeWidth="2"/>
        <circle cx="32" cy="35" r="3" stroke="#d4332a" strokeWidth="2"/>
      </svg>
    ),
    title: 'Кузовной ремонт',
    desc: 'Рихтовка, покраска, полировка. Устранение вмятин и царапин любой сложности.',
  },
];

export default function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="section-title">
          <h2>Наши услуги</h2>
          <p>Полный спектр услуг по ремонту и обслуживанию автомобилей любых марок</p>
        </div>
        <div className="services__grid">
          {services.map((s, i) => (
            <div key={i} className="service-card">
              <div className="service-card__icon">{s.icon}</div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
