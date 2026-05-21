const categories = [
  { name: 'Масла и жидкости', count: 124 },
  { name: 'Фильтры', count: 89 },
  { name: 'Тормозная система', count: 67 },
  { name: 'Подвеска и рулевое', count: 93 },
  { name: 'Двигатель и ГРМ', count: 112 },
  { name: 'Электрика', count: 78 },
  { name: 'Выхлопная система', count: 45 },
  { name: 'Кузов и оптика', count: 56 },
];

const popular = [
  { name: 'Масло моторное 5W-40', article: 'AC-1001', price: '85 Br' },
  { name: 'Фильтр масляный', article: 'AC-2001', price: '30 Br' },
  { name: 'Колодки тормозные передние', article: 'AC-3001', price: '120 Br' },
  { name: 'Свеча зажигания', article: 'AC-4001', price: '15 Br' },
  { name: 'Ремень ГРМ', article: 'AC-5001', price: '65 Br' },
  { name: 'Аккумулятор 60Ah', article: 'AC-6001', price: '200 Br' },
];

export default function Catalog() {
  return (
    <section id="catalog" className="section catalog">
      <div className="container">
        <div className="section-title">
          <h2>Каталог запчастей</h2>
          <p>Оригинальные и качественные аналоги для вашего автомобиля</p>
        </div>
        <div className="catalog__categories">
          {categories.map((cat, i) => (
            <div key={i} className="catalog__category">
              <span className="catalog__category-name">{cat.name}</span>
              <span className="catalog__category-count">{cat.count} шт.</span>
            </div>
          ))}
        </div>
        <h3 className="catalog__popular-title">Популярные товары</h3>
        <div className="catalog__popular">
          {popular.map((item, i) => (
            <div key={i} className="catalog__item">
              <div className="catalog__item-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect x="8" y="6" width="24" height="28" rx="3" stroke="#d4332a" strokeWidth="1.5" fill="#d4332a" fillOpacity="0.05"/>
                  <path d="M16 18h8M16 23h6" stroke="#d4332a" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="catalog__item-info">
                <span className="catalog__item-name">{item.name}</span>
                <span className="catalog__item-article">Арт. {item.article}</span>
              </div>
              <span className="catalog__item-price">{item.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
