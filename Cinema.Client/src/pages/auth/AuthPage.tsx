import { useState } from 'react'; // Обов'язково додаємо useState
import './AuthPage.css';
import { Eye, EyeOff } from 'lucide-react';

const AuthPage = () => {
    // Окремі стани для двох полів пароля
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="auth-wrapper">
            <div className="auth-banner">
                {/* Додай сюди логотип, як ми обговорювали раніше */}
                <div className="welcome-section">
                    <h1>Welcome. <br/> Begin your cinematic adventure now with our ticketing platform!</h1>
                </div>
            </div>

            <div className="auth-form-container">
                <div className="auth-form">
                    <h2>Create an account</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="input-group">
                            <label>Email</label>
                            <input type="email" placeholder="balamia@gmail.com"/>
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <div className="password-field">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="eye-icon"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Confirm Password</label>
                            <div className="password-field">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    className="eye-icon"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="submit-btn">Create account</button>

                        <p className="footer-text">
                            Already Have An Account? <a href="#">Log In</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;