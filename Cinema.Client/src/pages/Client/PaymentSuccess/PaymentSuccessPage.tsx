import { useNavigate } from "react-router-dom";
import styles from "./PaymentSuccessPage.module.css";
import toast from "react-hot-toast";
import { useEffect } from "react";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("Payment processed successfully!", { icon: '🎉' });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <svg viewBox="0 0 24 24" className={styles.checkIcon}>
            <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
          </svg>
        </div>
        <h1 className={styles.title}>Congratulations!</h1>
        <p className={styles.message}>
          Your payment was successful. Your tickets have been generated and are waiting for you in your profile.
        </p>
        <div className={styles.actions}>
          <button 
            className={styles.primaryBtn} 
            onClick={() => navigate("/profile")}
          >
            GO TO MY TICKETS
          </button>
          <button 
            className={styles.secondaryBtn} 
            onClick={() => navigate("/home")}
          >
            BACK TO HOME
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;