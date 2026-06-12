import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { authApi } from '../api';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Ссылка недействительна.');
      return;
    }

    authApi.verifyEmail(token)
      .then(res => {
        setStatus('success');
        setMessage(res.message);
      })
      .catch(err => {
        setStatus('error');
        setMessage(err.message || 'Ошибка подтверждения email.');
      });
  }, [searchParams]);

  return (
    <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
      {status === 'loading' && (
        <div>
          <h1>Подтверждение email...</h1>
          <p>Пожалуйста, подождите.</p>
        </div>
      )}
      {status === 'success' && (
        <div>
          <h1 style={{ color: '#22c55e' }}>✓ Email подтверждён!</h1>
          <p>{message}</p>
          <Link to="/login" className="btn btn-primary" style={{ marginTop: 20, display: 'inline-block' }}>
            Войти в аккаунт
          </Link>
        </div>
      )}
      {status === 'error' && (
        <div>
          <h1 style={{ color: '#ef4444' }}>✗ Ошибка</h1>
          <p>{message}</p>
          <Link to="/login" className="btn btn-primary" style={{ marginTop: 20, display: 'inline-block' }}>
            На страницу входа
          </Link>
        </div>
      )}
    </div>
  );
}
