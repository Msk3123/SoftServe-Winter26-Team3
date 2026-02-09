import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CheckoutPage.module.css";
import { createOrder } from "../../../features/admin/halls/api/createOrder";
import { initializePayment, PaymentMethod, submitLiqPayForm } from "../../../features/admin/halls/api/createPayment";
import toast from "react-hot-toast";
import { useState } from "react";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
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
    name: localStorage.getItem("userName") || "Ivan Hudko", 
    email: localStorage.getItem("userEmail") || "ivan.hudko@example.com",
    phone: localStorage.getItem("userPhone") || "+380 98 123 45 67"
  };

const handlePayment = async () => {
  if (isProcessing) return;
  
  const toastId = toast.loading("Preparing your order...");

  try {
    setIsProcessing(true);

    // 1. Створення ордера
    const order = await createOrder({
      userId: user.id,
      sessionId: Number(sessionId),
      selectedTickets: selectedSeats.map((seat: any) => ({
        sessionSeatId: seat.id,
        ticketTypeId: 1 
      }))
    });

    toast.loading("Initializing payment...", { id: toastId });

    // 2. Ініціалізація платежу (ВАЖЛИВО: два аргументи!)
    // Якщо TS все одно свариться на типи, можна тимчасово додати 'as any' 
    // до paymentData, але краще оновити інтерфейс PaymentResponse.
    const paymentData = await initializePayment(order.id, PaymentMethod.Online) as any;

    // 3. Відправка на LiqPay
    if (paymentData.checkoutUrl && paymentData.externalTransactionId) {
      
      submitLiqPayForm(
        paymentData.checkoutUrl, 
        paymentData.externalTransactionId
      );
    } else {
      throw new Error("Payment data is incomplete");
    }

  } catch (error: any) {
    console.error("Payment error:", error);
    toast.error(error.message || "Failed to process payment", { id: toastId });
  } finally {
    setIsProcessing(false);
  }
};

  return (
    <div className={styles.container}>
      <main className={styles.mainInfo}>
        <header className={styles.movieHeader}>
          <h1 className={styles.movieTitle}>{movieTitle || "Movie Title"}</h1>
          <div className={styles.sessionBrief}>
              <span>{hallName}</span> • 
              <span>{sessionDate?.split('T')[0]}</span> • 
              <span>{sessionTime?.slice(0, 5)}</span>
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
          {selectedSeats.map((seat: any) => (
            <div key={seat.id} className={styles.ticketItem}>
              <div>
                <p className={styles.seatInfo}>Row {seat.row}, Seat {seat.number}</p>
                <p className={styles.seatType}>{seat.type || "Standard"}</p>
              </div>
              <span className={styles.priceTag}>{seat.price} UAH</span>
            </div>
          ))}
        </div>

        <div className={styles.totalSection}>
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Total to pay:</span>
            <span className={styles.finalPrice}>{totalPrice} UAH</span>
          </div>
          <button 
            className={styles.payButton} 
            onClick={handlePayment}
            disabled={selectedSeats.length === 0 || isProcessing}
          >
            {isProcessing ? "PROCESSING..." : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default CheckoutPage;