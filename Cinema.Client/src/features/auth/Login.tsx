import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Login.module.css'; 

import { getUserIdFromToken } from '../../helpers/authHelper';
import { reserveSessionSeat } from '../../api/sessionSeatApi';
import toast from 'react-hot-toast';
import { useAuthSessionActions } from '../../hooks/useAuth/useAuth';

export const Login = () => { 
  const { loginForSession, isLoading, error: apiError } = useAuthSessionActions();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof typeof formData, boolean>>>({});

  // Валідація полів
  const validate = (name: string, value: string) => {
    if (name === 'email') {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email';
    }
    if (name === 'password' && !value) return 'Password is required';
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name as keyof typeof formData]) {
      setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (name: keyof typeof formData) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validate(name, formData[name as keyof typeof formData]) }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ручна перевірка перед сабмітом
    const eError = validate('email', formData.email);
    const pError = validate('password', formData.password);
    
    if (eError || pError) {
      setErrors({ email: eError, password: pError });
      setTouched({ email: true, password: true });
      return;
    }

    try {
      // 1. Авторизація через сесійний хук (повертає дані)
      const result = await loginForSession(formData);
      if (!result) return;

      const { role } = result;
      const userId = Number(getUserIdFromToken());
      
      // 2. ВАРІАНТ Б: Перевірка відкладеної резервації в localStorage
      const pendingDataRaw = localStorage.getItem('pending_reservation');
      
      if (role !== "Admin" && pendingDataRaw && userId) {
        const { seats, sessionId, movieTitle, hallName, totalPrice, sessionDate, sessionTime } = JSON.parse(pendingDataRaw);
        const loadingToast = toast.loading("Securing your seats on the server...");

        try {
          // 3. Резервуємо кожне місце на бекенді (заповнюємо reservedBy/userId)
          await Promise.all(
            seats.map((seat: any) => reserveSessionSeat(seat.id, userId))
          );
          
          toast.success("Seats secured! Moving to payment.", { id: loadingToast });
          localStorage.removeItem('pending_reservation');

          // 4. Перенаправляємо на Checkout з повним набором даних
          navigate("/checkout", { 
            state: { 
              sessionId, 
              selectedSeats: seats, 
              userId,
              movieTitle,
              hallName,
              totalPrice,
              sessionDate,
              sessionTime
            },
            replace: true 
          });
          return; 
        } catch (reserveError: any) {
          toast.error("Some seats were taken while you were logging in.", { id: loadingToast });
          localStorage.removeItem('pending_reservation');
          navigate(`/sessions/${sessionId}`); // Повертаємо переобрати місця
          return;
        }
      }

      // 5. Звичайна логіка редиректу, якщо немає броні
      if (role === "Admin") {
        navigate("/admin/movies", { replace: true });
      } else {
        const from = location.state?.from || "/home";
        navigate(from, { replace: true });
      }

    } catch (err) {
      // Помилки логіну обробляються хуком і виводяться через apiError
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Log In</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.label}>
          Email
          <input
            className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ''}`}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur('email')}
            placeholder="you@example.com"
          />
          {touched.email && errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </label>
        
        <label className={styles.label}>
          Password
          <input
            className={`${styles.input} ${touched.password && errors.password ? styles.inputError : ''}`}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={() => handleBlur('password')}
            placeholder="Enter your password"
          />
          {touched.password && errors.password && <span className={styles.errorText}>{errors.password}</span>}
        </label>

        {apiError && <p className={styles.error}>{apiError}</p>}

        <button className={styles.button} type="submit" disabled={isLoading}>
          {isLoading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      
      <p className={styles.footer}>
        No account yet? <Link to="/auth/signup">Create one</Link>
      </p>
    </div>
  );
};

export default Login;