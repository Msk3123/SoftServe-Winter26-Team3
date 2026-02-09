import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css'; 
import { useAuthActions } from '../../hooks/useAuth/useAuthActions';

export const Login = () => { 
  const { login, isLoading, error: apiError } = useAuthActions();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof typeof formData, boolean>>>({});

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
    setErrors(prev => ({ ...prev, [name]: validate(name, formData[name]) }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eError = validate('email', formData.email);
    const pError = validate('password', formData.password);
    
    if (eError || pError) {
      setErrors({ email: eError, password: pError });
      setTouched({ email: true, password: true });
      return;
    }
    await login(formData);
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