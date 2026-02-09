import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CheckoutPage.module.css";
import { createOrder } from "../../../features/admin/halls/api/createOrder";
import { initializePayment, PaymentMethod, submitLiqPayForm } from "../../../features/admin/halls/api/createPayment";
import toast from "react-hot-toast";
import { useState } from "react";
import { useUser } from "../../../hooks/useUser/useUser";
// Припускаю, що цей хук повертає дані про поточного юзера

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
    sessionId 
  } = location.state || {};

  const handlePayment = async () => {
    if (!userId) {
      toast.error("Please log in to continue");
      return;
    }

    if (isProcessing) return;
    const toastId = toast.loading("Processing order...");

    try {
      setIsProcessing(true);

      const order = await createOrder({
        userId: Number(userId),
        sessionId: Number(sessionId),
        selectedTickets: selectedSeats.map((seat: any) => ({
          sessionSeatId: seat.id,
          ticketTypeId: 1 
        }))
      });

      const paymentData = await initializePayment(order.id, PaymentMethod.Online);
      toast.success("Redirecting to payment...", { id: toastId });
      
      submitLiqPayForm(paymentData);
    } catch (error: any) {
      toast.error(error.message || "Payment failed", { id: toastId });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) return <div className={styles.loading}>Loading user data...</div>;
  if (!sessionId) return <div className={styles.error}>Error: Session not found. Please restart selection.</div>;

  return (
    <div className={styles.container}>
      <main className={styles.mainInfo}>
        <header className={styles.movieHeader}>
          <h1 className={styles.movieTitle}>{movieTitle}</h1>
          <div className={styles.sessionBrief}>
            <span>{hallName}</span> • <span>{sessionDate?.split('T')[0]}</span> • <span>{sessionTime?.slice(0, 5)}</span>
          </div>
        </header>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Ticket Recipient</h3>
          <div className={styles.userBadge}>
            <div className={styles.userInfo}>
              <strong>{user?.fullName || "Name not set"}</strong>
              <span>{user?.email}</span>
              <span>{user?.phoneNumber || "No phone added"}</span>
            </div>
            <button className={styles.editBtn} onClick={() => navigate("/profile")}>Edit Profile</button>
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
                <span className={styles.methodDesc}>Coming Soon</span>
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
                <p className={styles.seatType}>{typeof seat.type === 'object' ? seat.type.name : (seat.type || "Standard")}</p>
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
            {isProcessing ? "PROCESSING..." : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default CheckoutPage;