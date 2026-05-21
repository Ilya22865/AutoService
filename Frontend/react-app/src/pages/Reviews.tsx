const reviews = [
  {
    id: 1,
    name: 'Иван Петров',
    car: 'Toyota Camry 2020',
    rating: 5,
    date: '15.05.2026',
    text: 'Отличный автосервис! Быстро нашли проблему с двигателем, сделали диагностику и ремонт в тот же день. Цены адекватные, качество на высоте. Буду обращаться ещё.',
  },
  {
    id: 2,
    name: 'Анна Смирнова',
    car: 'Kia Rio 2021',
    rating: 5,
    date: '12.05.2026',
    text: 'Обратилась по поводу стука в подвеске. Мастер всё подробно объяснил, показал изношенные детали. Заменили сайлентблоки и шаровые — теперь машина как новая. Спасибо!',
  },
  {
    id: 3,
    name: 'Сергей Иванов',
    car: 'BMW X5 2019',
    rating: 4,
    date: '10.05.2026',
    text: 'Делал замену масла и диагностику. Всё быстро и качественно. Единственное — пришлось немного подождать в очереди. В остальном претензий нет.',
  },
  {
    id: 4,
    name: 'Дмитрий Козлов',
    car: 'Mazda CX-5 2020',
    rating: 5,
    date: '08.05.2026',
    text: 'Лучший автосервис в городе! Обслуживаюсь здесь уже третий год. Всегда качественный ремонт, вежливый персонал и приятные цены. Отдельное спасибо за гарантию на работы.',
  },
  {
    id: 5,
    name: 'Ольга Новикова',
    car: 'Renault Logan 2018',
    rating: 5,
    date: '05.05.2026',
    text: 'Большое спасибо за помощь на дороге! Сломалась в дороге, позвонила — приехали через 20 минут. Отбуксировали в сервис, всё починили. Очень выручили!',
  },
  {
    id: 6,
    name: 'Павел Соколов',
    car: 'Hyundai Tucson 2022',
    rating: 4,
    date: '02.05.2026',
    text: 'Хороший сервис. Делал плановое ТО и замену тормозных колодок. Всё по регламенту, дали отчёт о состоянии авто. Рекомендую.',
  },
  {
    id: 7,
    name: 'Екатерина Волкова',
    car: 'Volkswagen Polo 2021',
    rating: 5,
    date: '28.04.2026',
    text: 'Очень довольна ремонтом кондиционера. В других сервисах говорили, что нужна замена компрессора, а здесь нашли и устранили утечку — вышло в 3 раза дешевле. Честные мастера!',
  },
  {
    id: 8,
    name: 'Алексей Кузнецов',
    car: 'Honda Civic 2017',
    rating: 5,
    date: '25.04.2026',
    text: 'Делал капитальный ремонт двигателя. Работа сложная, но справились отлично. Прошло уже полгода — полёт нормальный. Цена соответствовала озвученной смете.',
  },
];

function Star({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill={filled ? '#d4332a' : '#e2e8f0'}>
      <path d="M9 1l2.2 4.5 5 .7-3.6 3.5.8 5L9 12.5 4.6 14.7l.8-5L1.8 6.2l5-.7L9 1z" />
    </svg>
  );
}

function Rating({ value }: { value: number }) {
  return (
    <div className="reviews__stars">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} filled={i <= value} />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <div className="reviews-page">
      <div className="reviews-hero">
        <div className="container">
          <h1>Отзывы наших клиентов</h1>
          <p>Более 5000 довольных клиентов за 15 лет работы</p>
          <div className="reviews-hero__stats">
            <div className="reviews-hero__stat">
              <span className="reviews-hero__num">4.9</span>
              <span className="reviews-hero__label">Средняя оценка</span>
            </div>
            <div className="reviews-hero__stat">
              <span className="reviews-hero__num">98%</span>
              <span className="reviews-hero__label">Рекомендуют нас</span>
            </div>
            <div className="reviews-hero__stat">
              <span className="reviews-hero__num">156</span>
              <span className="reviews-hero__label">Отзывов за месяц</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container reviews__list">
        {reviews.map(r => (
          <div key={r.id} className="review-card">
            <div className="review-card__header">
              <div className="review-card__avatar">{r.name[0]}</div>
              <div className="review-card__info">
                <span className="review-card__name">{r.name}</span>
                <span className="review-card__car">{r.car}</span>
              </div>
              <div className="review-card__meta">
                <Rating value={r.rating} />
                <span className="review-card__date">{r.date}</span>
              </div>
            </div>
            <p className="review-card__text">{r.text}</p>
          </div>
        ))}
      </div>
      <div className="container reviews__cta">
        <h2>Оставьте свой отзыв</h2>
        <p>Ваше мнение помогает нам становиться лучше</p>
        <form className="reviews__form" onSubmit={e => e.preventDefault()}>
          <div className="reviews__form-row">
            <input type="text" className="reviews__input" placeholder="Ваше имя" required />
            <input type="text" className="reviews__input" placeholder="Марка и модель авто" />
          </div>
          <div className="reviews__form-rating">
            <span className="reviews__rating-label">Ваша оценка:</span>
            <div className="reviews__rating-stars">
              {[1, 2, 3, 4, 5].map(i => (
                <button key={i} type="button" className="reviews__star-btn">
                  <svg width="28" height="28" viewBox="0 0 18 18" fill="#e2e8f0">
                    <path d="M9 1l2.2 4.5 5 .7-3.6 3.5.8 5L9 12.5 4.6 14.7l.8-5L1.8 6.2l5-.7L9 1z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <textarea className="reviews__textarea" placeholder="Напишите ваш отзыв..." rows={4} required />
          <button type="submit" className="btn btn-primary reviews__submit">Отправить отзыв</button>
        </form>
      </div>
    </div>
  );
}
