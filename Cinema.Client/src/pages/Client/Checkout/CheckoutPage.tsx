import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CheckoutPage.module.css";
import { createOrder } from "../../../features/admin/halls/api/createOrder";
import { initializePayment, PaymentMethod, submitLiqPayForm } from "../../../features/admin/halls/api/createPayment";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { 
    selectedSeats = [], 
    movieTitle, 
    hallName, 
    totalPrice, 
    sessionDate, 
    sessionTime,
    sessionId 
  } = location.state || {};


  const user = {
    id: Number(localStorage.getItem("userId")) || 1,
    name: "Ivan Hudko", 
    email: "ivan.hudko@example.com",
    phone: "+380 98 123 45 67"
  };

  const handlePayment = async () => {
    try {
      const order = await createOrder({
        userId: user.id,
        sessionId: Number(sessionId),
        selectedTickets: selectedSeats.map((seat: any) => ({
          sessionSeatId: seat.id,
          ticketTypeId: seat.type?.id || 1 
        }))
      });

      const { value, signature } = await initializePayment(
        order.id, 
        PaymentMethod.Online
      );

      submitLiqPayForm(value, signature);

    } catch (error) {
      console.error("Payment failed:", error);
      toast("Initializing payment soon. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.mainInfo}>
        <header className={styles.movieHeader}>
          <h1 className={styles.movieTitle}>{movieTitle || "Inception"}</h1>
          <div className={styles.sessionBrief}>
              <span>{hallName || "Hall 3"}</span> • 
              <span>{sessionDate?.split('T')[0] || "2026-02-12"}</span> • 
              <span>{sessionTime?.slice(0, 5) || "20:00"}</span>
          </div>
        </header>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Ticket Recipient</h3>
          <div className={styles.userBadge}>
            <div className={styles.userInfo}>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
              <span>{user.phone}</span>
            </div>
            <button 
              className={styles.editBtn} 
              onClick={() => navigate("/profile")}
            >
              Edit
            </button>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Payment Method</h3>
          <div className={styles.methodsGrid}>
            <div className={`${styles.methodCard} ${styles.active}`}>
              <div className={styles.methodContent}>
                <span className={styles.methodName}>LiqPay</span>
                <span className={styles.methodDesc}>Card / Apple Pay / Google Pay</span>
              </div>
            </div>

            <div className={`${styles.methodCard} ${styles.disabled}`}>
              <div className={styles.methodContent}>
                <span className={styles.methodName}>PayPal</span>
                <span className={styles.methodDesc}>Worldwide Electronic Wallet</span>
              </div>
              <span className={styles.comingSoon}>Coming Soon</span>
            </div>
          </div>
        </section>
      </main>

      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Tickets ({selectedSeats.length})</h3>
        <div className={styles.ticketList}>
          {selectedSeats.length > 0 ? selectedSeats.map((seat: any) => (
            <div key={seat.id} className={styles.ticketItem}>
              <div>
                <p className={styles.seatInfo}>Row {seat.row}, Seat {seat.number}</p>
                <p className={styles.seatType}>{seat.type?.name || "Standard"}</p>
              </div>
              <span className={styles.priceTag}>{seat.price} UAH</span>
            </div>
          )) : (
              <p className={styles.emptyMsg}>No seats selected</p>
          )}
        </div>

        <div className={styles.totalSection}>
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Total to pay:</span>
            <span className={styles.finalPrice}>{totalPrice} UAH</span>
          </div>
          <button 
            className={styles.payButton} 
            onClick={handlePayment}
            disabled={selectedSeats.length === 0}
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </aside>
    </div>
  );
};

export default CheckoutPage;