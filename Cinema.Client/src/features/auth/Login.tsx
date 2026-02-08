import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css'; 
import { useAuthActions } from '../../hooks/useAuth/useAuthActions';

export const Login = () => { 
  const { login, isLoading, error } = useAuthActions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  const buttonContent = isLoading ? 'Signing in…' : 'Sign in';

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Log In</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </label>
        <label className={styles.label}>
          Password
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.button} type="submit" disabled={isLoading}>
          {buttonContent}
        </button>
      </form>
      <p className={styles.footer}>
        No account yet? <Link to="/auth/signup">Create one</Link>
      </p>
    </div>
  );
};

export default Login;