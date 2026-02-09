import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SignUp.module.css';
import { useAuthActions } from '../../hooks/useAuth/useAuthActions';

export const SignUp = () => {
  const { signup, isLoading, error: apiError } = useAuthActions();
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', email: '', password: '', confirmPassword: ''
  });

  // === СТАН ДЛЯ ПОМИЛОК ТА ВЗАЄМОДІЇ ===
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof typeof formData, boolean>>>({});

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const validateField = (name: string, value: string, currentData: typeof formData) => {
    let error = '';
    switch (name) {
      case 'firstName':
        if (!value.trim()) error = 'First name is required';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!emailRegex.test(value)) error = 'Invalid email format';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (value.length < 8) error = 'Min 8 characters';
        break;
      case 'confirmPassword':
        if (!value) error = 'Please confirm password';
        else if (value !== currentData.password) error = 'Passwords do not match';
        break;
      case 'phone':
        if (value && !/^\+?[0-9]{10,12}$/.test(value)) error = 'Invalid phone format';
        break;
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    // Валідація "на льоту", якщо поле вже було зачеплене
    if (touched[name as keyof typeof formData]) {
      const fieldError = validateField(name, value, updatedData);
      setErrors(prev => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, value, formData);
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Перевірка всіх полів перед відправкою
    const newErrors: any = {};
    Object.keys(formData).forEach(key => {
      const err = validateField(key, formData[key as keyof typeof formData], formData);
      if (err) newErrors[key] = err;
    });

    setErrors(newErrors);
    setTouched({ firstName: true, email: true, password: true, confirmPassword: true });

    if (Object.keys(newErrors).length === 0) {
      await signup(formData);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create account</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.row}>
          <label className={styles.label}>
            First name
            <input 
              className={`${styles.input} ${touched.firstName && errors.firstName ? styles.inputError : ''}`} 
              name="firstName" type="text" onChange={handleChange} onBlur={handleBlur} 
            />
            {touched.firstName && errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
          </label>
          <label className={styles.label}>
            Last name
            <input className={styles.input} name="lastName" type="text" onChange={handleChange} />
          </label>
        </div>
        
        <label className={styles.label}>
          Phone
          <input className={styles.input} name="phone" type="tel" onChange={handleChange} onBlur={handleBlur} />
          {touched.phone && errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
        </label>

        <label className={styles.label}>
          Email
          <input 
            className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ''}`} 
            name="email" type="email" onChange={handleChange} onBlur={handleBlur} 
          />
          {touched.email && errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </label>

        <label className={styles.label}>
          Password
          <input 
            className={`${styles.input} ${touched.password && errors.password ? styles.inputError : ''}`} 
            name="password" type="password" onChange={handleChange} onBlur={handleBlur} 
          />
          {touched.password && errors.password && <span className={styles.errorText}>{errors.password}</span>}
        </label>

        <label className={styles.label}>
          Confirm password
          <input 
            className={`${styles.input} ${touched.confirmPassword && errors.confirmPassword ? styles.inputError : ''}`} 
            name="confirmPassword" type="password" onChange={handleChange} onBlur={handleBlur} 
          />
          {touched.confirmPassword && errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
        </label>

        {apiError && <p className={styles.error}>{apiError}</p>}
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