import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { jsPDF } from 'jspdf';
import { getList, postItem } from '../../../api/api';
import styles from './UserPage.module.css';
import { formatDate } from '../../../helpers/dateHelpers';

const statusLabels: Record<string | number, string> = {
    0: 'Created', 1: 'Reserved', 2: 'Confirmed', 3: 'Cancelled', 4: 'Completed', 5: 'Refunded',
    "Cancelled": "Cancelled", "Pending": "Pending", "Confirmed": "Confirmed", "Active": "Active"
};

const UserPage = () => {
    const [activeTab, setActiveTab] = useState<'tickets' | 'security'>('tickets');
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 6; 

    const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
    const [passData, setPassData] = useState({ newPassword: '', confirmPassword: '' });
    const [ticketError, setTicketError] = useState('');
    const [authMessage, setAuthMessage] = useState({ text: '', isError: false });

    const currentOrigin = window.location.origin;

    const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMessage({ text: '', isError: false });

    // Валідація довжини
    if (passData.newPassword.length < 8) {
        return setAuthMessage({ 
            text: "Password must be at least 8 characters long", 
            isError: true 
        });
    }

    // Перевірка збігу паролів
    if (passData.newPassword !== passData.confirmPassword) {
        return setAuthMessage({ 
            text: "Passwords do not match", 
            isError: true 
        });
    }

    try {
        // Виклик твого API
        await postItem('auth/change-password', { newPassword: passData.newPassword });
        setAuthMessage({ text: "Password updated successfully!", isError: false });
        
        // Очищення полів
        setPassData({ newPassword: '', confirmPassword: '' });
    } catch (err) {
        setAuthMessage({ 
            text: "Error updating password. Try again later.", 
            isError: true 
        });
    }
};

    const getUserIdFromToken = () => {
        const token = localStorage.getItem('accessToken');
        if (!token) return null;
        try {
            const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(decodeURIComponent(window.atob(base64).split('').map(c => 
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')));
            return payload.nameid;
        } catch (e) { return null; }
    };

    const fetchTickets = async () => {
        const userId = getUserIdFromToken();
        if (!userId) return;
        setLoading(true);
        try {
            const res: any = await getList(`Ticket/user/${userId}?Page=${currentPage}&Limit=${pageSize}`);
            setTickets(res.items || []); 
            setTotalCount(res.totalCount || 0);
        } catch (err) {
            setTicketError("Failed to load tickets");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'tickets') fetchTickets();
    }, [activeTab, currentPage]);

    // ФУНКЦІЯ ГЕНЕРАЦІЇ PDF (Синхронізована з дизайном)
    const generateTicketPDF = (ticket: any) => {
        const doc = new jsPDF();
        
        // Малюємо чорний фон (RGB 18, 18, 18)
        doc.setFillColor(18, 18, 18);
        doc.rect(0, 0, 210, 297, 'F');
        
        // Заголовок (Зелений: 0, 223, 130)
        doc.setTextColor(0, 223, 130);
        doc.setFontSize(28);
        doc.text('CINEMAS TICKET', 20, 40);
        
        // Основні дані (Білий: 255, 255, 255)
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.text(`Movie: ${ticket.movieTitle}`, 20, 65);
        doc.text(`Date: ${formatDate(ticket.showtime)}`, 20, 80);
        doc.text(`Hall: ${ticket.hallName}`, 20, 95);
        doc.text(`Row: ${ticket.row} | Seat: ${ticket.seatNo}`, 20, 110);
        
        const price = ticket.price?.parsedValue || ticket.price;
        doc.text(`Price: ${price} UAH`, 20, 125);
        
        // Розділювальна лінія
        doc.setDrawColor(0, 223, 130);
        doc.setLineWidth(0.5);
        doc.line(20, 140, 190, 140);
        
        // Футер з ID
        doc.setFontSize(12);
        doc.text(`Ticket ID: #${ticket.id}`, 20, 155);
        doc.text('Please show this PDF or QR code at the entrance.', 20, 175);

        doc.save(`Ticket_${ticket.id}.pdf`);
    };

    const totalPages = Math.ceil(totalCount / pageSize);
    const ticketUrl = selectedTicket ? `${currentOrigin}/ticket/view/${selectedTicket.id}` : '';

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.profileIcon}>SS</div>
                <nav className={styles.nav}>
                    <button className={activeTab === 'tickets' ? styles.active : ''} onClick={() => setActiveTab('tickets')}>🎫 My Tickets</button>
                    <button className={activeTab === 'security' ? styles.active : ''} onClick={() => setActiveTab('security')}>🔒 Security</button>
                </nav>
                <button className={styles.logoutBtn} onClick={() => { localStorage.clear(); window.location.href = '/auth/login'; }}>Logout</button>
            </aside>

            <main className={styles.content}>
                {activeTab === 'tickets' ? (
                    <section>
                        <h2 className={styles.title}>Your tickets</h2>
                        {loading ? <p className={styles.statusMsg}>Loading...</p> : (
                            <>
                                <div className={styles.ticketGrid}>
                                    {tickets.map(t => {
                                        const statusKey = t.orderStatus !== undefined ? t.orderStatus : t.ticketStatus;
                                        return (
                                            <div key={t.id} className={styles.ticketCard} onClick={() => setSelectedTicket(t)}>
                                                <div className={styles.ticketHeader}>
                                                    <span className={styles.movieTitle}>{t.movieTitle}</span>
                                                    <span className={`${styles.statusBadge} ${styles['status' + statusKey]}`}>
                                                        {statusLabels[statusKey] || statusKey}
                                                    </span>
                                                </div>
                                                <div className={styles.ticketBody}>
                                                    <p>📅 {t.showtime ? formatDate(t.showtime) : 'No date'}</p>
                                                    <p>🎬 {t.hallName} | Row: {t.row} | Seat: {t.seatNo}</p>
                                                    <p className={styles.orderId}>#{t.id}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                {totalPages > 1 && (
                                    <div className={styles.pagination}>
                                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>←</button>
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button key={i} className={currentPage === i + 1 ? styles.activePage : ''} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                                        ))}
                                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>→</button>
                                    </div>
                                )}
                            </>
                        )}
                    </section>
                ) : (
                    <section className={styles.section}>
                        <h2 className={styles.title}>Account Security</h2>
                        {authMessage.text && <div className={authMessage.isError ? styles.errorBanner : styles.successBanner}>{authMessage.text}</div>}
                        <form onSubmit={handlePasswordUpdate} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label>New Password</label>
                                <input type="password" value={passData.newPassword} onChange={e => setPassData({...passData, newPassword: e.target.value})} placeholder="••••••••" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Confirm Password</label>
                                <input type="password" value={passData.confirmPassword} onChange={e => setPassData({...passData, confirmPassword: e.target.value})} placeholder="••••••••" />
                            </div>
                            <button type="submit" className={styles.saveBtn}>Update Password</button>
                        </form>
                    </section>
                )}
            </main>

            {selectedTicket && (
                <div className={styles.modalOverlay} onClick={() => setSelectedTicket(null)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeModal} onClick={() => setSelectedTicket(null)}>×</button>
                        <h3 className={styles.movieTitle}>{selectedTicket.movieTitle}</h3>
                        
                        <div className={styles.qrContainer}>
                            {/* ТЕПЕР КАРТИНКА - ЦЕ ПОСИЛАННЯ */}
                            <a href={ticketUrl} target="_blank" rel="noreferrer" title="Click to open ticket view">
                                <QRCodeSVG value={ticketUrl} size={200} fgColor="#00df82" bgColor="#1e1e1e" />
                            </a>
                            <p className={styles.qrFooterText}>Scan or click to view PDF</p>
                        </div>

                        <button className={styles.saveBtn} onClick={() => generateTicketPDF(selectedTicket)}>
                            Download PDF Ticket
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserPage;