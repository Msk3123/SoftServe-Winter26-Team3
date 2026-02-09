import { useState, useEffect } from 'react';
import { getList, postItem } from '../../../api/api';
import styles from './UserPage.module.css';

const UserPage = () => {
    const [activeTab, setActiveTab] = useState<'tickets' | 'security'>('tickets');
    const [tickets, setTickets] = useState<any[]>([]);
    const [passData, setPassData] = useState({ newPassword: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    
    // Окремі стани для повідомлень, щоб вони не перетиналися між вкладками
    const [ticketError, setTicketError] = useState('');
    const [authMessage, setAuthMessage] = useState({ text: '', isError: false });

    // Функція для парсингу ID з токена (nameid)
    const getUserIdFromToken = () => {
        // ВИПРАВЛЕНО: Використовуємо правильний ключ 'accessToken'
        const token = localStorage.getItem('accessToken'); 
        
        if (!token) {
            console.error("DEBUG: Токен accessToken відсутній у localStorage");
            return null;
        }

        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            
            // Безпечне декодування (підтримує кирилицю)
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const payload = JSON.parse(jsonPayload);
            
            // Повертаємо nameid (у твоєму токені це "10")
            return payload.nameid; 
        } catch (e) {
            console.error("DEBUG: Помилка парсингу токена:", e);
            return null;
        }
    };

    // 1. ЗАВАНТАЖЕННЯ КВИТКІВ
    useEffect(() => {
        if (activeTab === 'tickets') {
            const userId = getUserIdFromToken();
            
            if (!userId) {
                setTicketError("Користувач не ідентифікований");
                return;
            }

            setLoading(true);
            setTicketError(''); 
            
            // Запит до твого Ticket контролера
            getList(`Ticket/user/${userId}`)
                .then((res: any) => {
                    setTickets(res.data);
                })
                .catch(() => {
                    setTicketError("Не вдалося завантажити квитки");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [activeTab]);

    // 2. ЗМІНА ПАРОЛЯ
    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthMessage({ text: '', isError: false });

        if (passData.newPassword.length < 8) {
            return setAuthMessage({ text: "Пароль має бути не менше 8 символів", isError: true });
        }
        if (passData.newPassword !== passData.confirmPassword) {
            return setAuthMessage({ text: "Паролі не збігаються", isError: true });
        }

        try {
            // Виклик твого AuthService через AuthController
            await postItem('auth/change-password', { newPassword: passData.newPassword });
            setAuthMessage({ text: "Пароль успішно оновлено!", isError: false });
            setPassData({ newPassword: '', confirmPassword: '' });
        } catch (err) {
            setAuthMessage({ text: "Помилка при зміні пароля. Спробуйте пізніше", isError: true });
        }
    };

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.profileIcon}>SS</div>
                <nav className={styles.nav}>
                    <button 
                        className={activeTab === 'tickets' ? styles.active : ''} 
                        onClick={() => { 
                            setActiveTab('tickets'); 
                            setAuthMessage({text: '', isError: false}); // Очищуємо повідомлення при зміні таба
                        }}
                    >
                        🎫 Мої Квитки
                    </button>
                    <button 
                        className={activeTab === 'security' ? styles.active : ''} 
                        onClick={() => { 
                            setActiveTab('security'); 
                            setTicketError(''); // Очищуємо помилки квитків
                        }}
                    >
                        🔒 Безпека
                    </button>
                </nav>
                <button className={styles.logoutBtn} onClick={() => {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/auth/login';
                }}>Вийти</button>
            </aside>

            <main className={styles.content}>
                {activeTab === 'tickets' ? (
                    <section className={styles.section}>
                        <h2 className={styles.title}>Ваші квитки</h2>
                        
                        {/* Повідомлення про помилку завантаження */}
                        {ticketError && <div className={styles.errorBanner}>{ticketError}</div>}
                        
                        {loading ? <p className={styles.statusMsg}>Синхронізація з базою...</p> : (
                            <div className={styles.ticketGrid}>
                                {tickets && tickets.length > 0 ? tickets.map(t => (
                                    <div key={t.id} className={styles.ticketCard}>
                                        <div className={styles.ticketHeader}>
                                            <span className={styles.movieTitle}>{t.movieTitle || 'Фільм'}</span>
                                            <span className={styles.orderId}>#{t.id}</span>
                                        </div>
                                        <div className={styles.ticketBody}>
                                            <p>📅 {t.sessionDate ? new Date(t.sessionDate).toLocaleDateString() : 'Дата не вказана'}</p>
                                            <p>🎬 Зал: {t.hallName || '-'} | Місце: {t.seatNumber || '-'}</p>
                                        </div>
                                    </div>
                                )) : !ticketError && <p className={styles.emptyMsg}>Квитків не знайдено.</p>}
                            </div>
                        )}
                    </section>
                ) : (
                    <section className={styles.section}>
                        <h2 className={styles.title}>Безпека акаунта</h2>
                        
                        {/* Повідомлення про успіх/помилку пароля */}
                        {authMessage.text && (
                            <div className={authMessage.isError ? styles.errorBanner : styles.successBanner}>
                                {authMessage.text}
                            </div>
                        )}
                        
                        <form onSubmit={handlePasswordUpdate} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label>Новий пароль</label>
                                <input 
                                    type="password" 
                                    value={passData.newPassword}
                                    onChange={e => setPassData({...passData, newPassword: e.target.value})}
                                    placeholder="••••••••"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Підтвердіть пароль</label>
                                <input 
                                    type="password" 
                                    value={passData.confirmPassword}
                                    onChange={e => setPassData({...passData, confirmPassword: e.target.value})}
                                    placeholder="••••••••"
                                />
                            </div>
                            <button type="submit" className={styles.saveBtn}>Оновити пароль</button>
                        </form>
                    </section>
                )}
            </main>
        </div>
    );
};

export default UserPage;