import './AuthPage.css';

const AuthPage = () => {
    return (
        <div className="auth-wrapper"> {/* Загальний контейнер */}

            <div className="auth-banner"> {/* Контейнер 1 (лівий) */}
                <h1>Привіт </h1>
            </div>

            <div className="auth-form-container"> {/* Контейнер 2 (правий) */}
                <div className="auth-form">
               <h2>Create account</h2>
                <form>
                    <p>Email</p>
                    <input type="text" placeholder="Email" />
                    <p>Password</p>
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Sign up</button>
                    <p>Already have an account? <a href="#">Sign in</a></p>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default AuthPage;