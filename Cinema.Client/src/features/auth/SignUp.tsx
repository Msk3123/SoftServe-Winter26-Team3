import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SignUp.module.css';
import { useAuthActions } from '../../hooks/useAuth/useAuthActions';

export const SignUp = () => {
  const { signup, isLoading, error } = useAuthActions();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create account</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.row}>
          <label className={styles.label}>
            First name
            <input className={styles.input} name="firstName" type="text" onChange={handleChange} required />
          </label>
          <label className={styles.label}>
            Last name
            <input className={styles.input} name="lastName" type="text" onChange={handleChange} />
          </label>
        </div>
        <label className={styles.label}>
          Phone
          <input className={styles.input} name="phone" type="tel" onChange={handleChange} />
        </label>
        <label className={styles.label}>
          Email
          <input className={styles.input} name="email" type="email" onChange={handleChange} required />
        </label>
        <label className={styles.label}>
          Password
          <input className={styles.input} name="password" type="password" onChange={handleChange} required />
        </label>
        <label className={styles.label}>
          Confirm password
          <input className={styles.input} name="confirmPassword" type="password" onChange={handleChange} required />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.button} type="submit" disabled={isLoading}>
          {isLoading ? 'Creating…' : 'Create account'}
        </button>
      </form>
      <p className={styles.footer}>
        Already have an account? <Link to="/auth/login">Log in</Link>
      </p>
    </div>
  );
};

export default SignUp;