import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SignUp.module.css';
import { useAuthActions } from './hooks/useAuthActions';

const SignUp: React.FC = () => {
    const { signup, isLoading, error } = useAuthActions();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await signup({ firstName, lastName, phone, email, password, confirmPassword });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create account</h1>

            <form className={styles.form} onSubmit={onSubmit}>
                <label className={styles.label}>
                    First name
                    <input
                        className={styles.input}
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>

                <label className={styles.label}>
                    Last name
                    <input
                        className={styles.input}
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </label>

                <label className={styles.label}>
                    Phone
                    <input
                        className={styles.input}
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="tel"
                    />
                </label>

                <label className={styles.label}>
                    Email
                    <input
                        className={styles.input}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        autoComplete="new-password"
                        required
                    />
                </label>

                <label className={styles.label}>
                    Confirm password
                    <input
                        className={styles.input}
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                        required
                    />
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