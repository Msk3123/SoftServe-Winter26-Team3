import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CheckoutPage.module.css"; // Переконайся, що розширення правильне (.module.css?)
import { createOrder } from "../../../features/admin/halls/api/createOrder";
import { initializePayment, PaymentMethod, submitLiqPayForm } from "../../../features/admin/halls/api/createPayment";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useUser } from "../../../hooks/useUser/useUser";
import { getItem } from "../../../api/api"; 

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { user, userId, isLoading } = useUser();

  const { 
    selectedSeats = [], 
    movieTitle, 
    hallName, 
    totalPrice, 
    sessionDate, 
    sessionTime,
    sessionId,
    isResume = false // <--- Отримуємо прапорець з SessionDetails
  } = location.state || {};

 const handlePayment = async () => {
  if (!userId) {
    toast.error("Please log in to continue");
    return;
  }

  if (isProcessing) return;
  const toastId = toast.loading(isResume ? "Resuming payment..." : "Processing order...");

  try {
    setIsProcessing(true);
    let orderId;

    if (isResume) {
      // СЦЕНАРІЙ А: Продовження оплати
      try {
        const response: any = await getItem("Order/active", userId);
        const existingOrder = response.data || response;
        orderId = existingOrder.id;
      } catch (error: any) {
        // Якщо 404, не зупиняємось, створимо новий нижче
        console.log("Active order not found, will create a new one.");
      }
    }

    // СЦЕНАРІЙ Б: Якщо це НЕ продовження АБО продовження не знайшло старий ордер
    if (!orderId) {
      const newOrder = await createOrder({
        userId: Number(userId),
        sessionId: Number(sessionId),
        selectedTickets: selectedSeats.map((seat: any) => ({
          sessionSeatId: seat.id,
          ticketTypeId: 1
        }))
      });
      orderId = newOrder.id;
    }

    // ТЕПЕР orderId точно є
    const paymentData = await initializePayment(orderId, PaymentMethod.Online);
    toast.success("Redirecting to payment...", { id: toastId });
    submitLiqPayForm(paymentData);

  } catch (error: any) {
    toast.error(error.message || "Payment failed", { id: toastId });
  } finally {
    setIsProcessing(false);
  }
};

  if (isLoading) return <div className={styles.loading}>Loading user data...</div>;
  if (!sessionId) return <div className={styles.error}>Error: Session not found.</div>;

  return (
    <div className={styles.container}>
      <main className={styles.mainInfo}>
        <header className={styles.movieHeader}>
          <h1 className={styles.movieTitle}>{movieTitle}</h1>
          <div className={styles.sessionBrief}>
            <span>{hallName}</span> • <span>{sessionDate?.split('T')[0]}</span> • <span>{sessionTime?.slice(0, 5)}</span>
          </div>
        </header>

        {/* ... Секції з юзером та методом оплати (без змін) ... */}
        
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Ticket Recipient</h3>
          <div className={styles.userBadge}>
            <div className={styles.userInfo}>
              <strong>
                {user?.firstName 
                  ? `${user.firstName} ${user.lastName || ""}` 
                  : "Name not set"}
              </strong>
              <span>{user?.email}</span>
            </div>
            <button className={styles.editBtn} onClick={() => navigate("/profile")}>Edit Profile</button>
          </div>
        </section>

        <section className={styles.section}>
  <h3 className={styles.sectionTitle}>Payment Method</h3> 
  <div className={styles.methodsGrid}>
    {/* Активний метод LiqPay */} 
    <div className={`${styles.methodCard} ${styles.active}`}>
      <div className={styles.methodContent}>
        <span className={styles.methodName}>LiqPay</span>
      </div>
    </div>

    {/* Нова кнопка PayPal (Coming Soon) */}
    <div className={`${styles.methodCard} ${styles.disabledCard}`}>
      <div className={styles.methodContent}>
        <span className={styles.methodName}>PayPal</span>
        <span className={styles.comingSoonBadge}>Coming Soon</span>
      </div>
    </div>
  </div>
</section>
      </main>

      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Order Summary</h3>
        <div className={styles.ticketList}>
          {selectedSeats.map((seat: any) => (
            <div key={seat.id} className={styles.ticketItem}>
              <div>
                <p className={styles.seatInfo}>Row {seat.row}, Seat {seat.number}</p>
              </div>
              <span className={styles.priceTag}>{seat.price} UAH</span>
            </div>
          ))}
        </div>

        <div className={styles.totalSection}>
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Total:</span>
            <span className={styles.finalPrice}>{totalPrice} UAH</span>
          </div>
          <button 
            className={styles.payButton} 
            onClick={handlePayment}
            disabled={selectedSeats.length === 0 || isProcessing}
          >
            {isProcessing ? "PROCESSING..." : isResume ? "CONTINUE PAYMENT" : "PROCEED TO PAYMENT"}
          </button>
          
          {isResume && <p className={styles.resumeHint}>* You have an active reservation for these seats</p>}
        </div>
      </aside>
    </div>
  );
};

export default CheckoutPage;