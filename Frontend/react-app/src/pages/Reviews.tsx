import { useState, useEffect } from 'react';
import { reviewApi, type ReviewDto } from '../api';
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
    const [reviews, setReviews] = useState<ReviewDto[]>([]);
    const [clientName, setClientName] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    useEffect(() => { reviewApi.getReviews().then(setReviews).catch(console.error) }, []);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            try {
                const raw = atob(token.split('.')[1]);
                const utf8 = decodeURIComponent(escape(raw));
                const payload = JSON.parse(utf8);
                const n = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || payload.unique_name || payload.clientName;
                if(n) setClientName(n);
            } catch (error) {
                console.error(error);
            }
        }
    }, []);
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
        {reviews.map((r, i) => (
          <div key={i} className="review-card">
            <div className="review-card__header">
              <div className="review-card__avatar">{(r.clientName || '?')[0]}</div>
              <div className="review-card__info">
                <span className="review-card__name">{r.clientName}</span>
                <span className="review-card__car">{r.vehicleModel}</span>
              </div>
              <div className="review-card__meta">
                <Rating value={r.rating} />
                <span className="review-card__date">{r.date}</span>
              </div>
            </div>
            <p className="review-card__text">{r.comment}</p>
          </div>
        ))}
      </div>
      <div className="container reviews__cta">
        <h2>Оставьте свой отзыв</h2>
        <p>Ваше мнение помогает нам становиться лучше</p>
        <form className="reviews__form" onSubmit={async e => {
          e.preventDefault();
          try {
            await reviewApi.addReview({ rating, comment, vehicleModel });
            setComment('');
            setRating(0);
            setVehicleModel('');
            const updated = await reviewApi.getReviews();
            setReviews(updated);
          } catch (err) {
            console.error(err);
          }
        }}>
          <div className="reviews__form-row">
            <input type="text" className="reviews__input" placeholder="Ваше имя" value={clientName} readOnly />
            <input type="text" className="reviews__input" placeholder="Марка и модель авто" value={vehicleModel} onChange={e => setVehicleModel(e.target.value)} />
          </div>
          <div className="reviews__form-rating">
            <span className="reviews__rating-label">Ваша оценка:</span>
            <div className="reviews__rating-stars">
              {[1, 2, 3, 4, 5].map(i => (
                <button key={i} type="button" className="reviews__star-btn" onClick={() => setRating(i)}>
                  <svg width="28" height="28" viewBox="0 0 18 18" fill={i <= rating ? '#d4332a' : '#e2e8f0'}>
                    <path d="M9 1l2.2 4.5 5 .7-3.6 3.5.8 5L9 12.5 4.6 14.7l.8-5L1.8 6.2l5-.7L9 1z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <textarea className="reviews__textarea" placeholder="Напишите ваш отзыв..." value={comment} onChange={e => setComment(e.target.value)} rows={4} required />
          <button type="submit" className="btn btn-primary reviews__submit">Отправить отзыв</button>
        </form>
      </div>
    </div>
  );
}
