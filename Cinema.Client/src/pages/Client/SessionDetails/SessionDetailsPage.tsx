import { useParams, useNavigate } from "react-router-dom";
import styles from "./SessionDetailsPage.module.css";
import useSessionHallMap from "../../../hooks/useSessionHallMap/useSessionHallMap";
import HallMap from "../../../components/HallMap/HallMap/HallMap";
import Seat from "../../../components/HallMap/Seat/Seat";
import { getSeatColor } from "../../../features/admin/halls/helpers/getSeatColor";
import Error from "../../../components/Error/Error";
import { useState, useEffect } from "react";
import MovieDetailsSkeleton from "../MovieDetails/MovieDetailsPageSkeleton";
import { reserveSessionSeat } from "../../../api/sessionSeatApi";
import { postItem } from "../../../api/api"; 
import toast from "react-hot-toast";
import { getUserIdFromToken } from "../../../helpers/authHelper";

const SessionDetails = () => {
  const [isReserving, setIsReserving] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const storedUserId = getUserIdFromToken();
  const isAuthenticated = !!(token && storedUserId);

  const {
    sessionData,
    seats,
    selectedSeats,
    totalPrice,
    isLoading,
    toggleSeat
  } = useSessionHallMap(sessionId || "");

  // Перевірка на існуючі резерви користувача
  useEffect(() => {
    if (!isAuthenticated || !storedUserId || !seats || seats.length === 0 || isCancelling) return;

    const flatSeats = seats.flat();
    const currentUserId = String(storedUserId);

    const myReservedSeats = flatSeats.filter((seat: any) => {
      const status = String(seat.status).toLowerCase();
      const seatUserId = String(seat.lockedByUserId || "");
      // Статус 3 або "reserved"
      return (status === "reserved" || status === "3") && seatUserId === currentUserId;
    });

    if (myReservedSeats.length > 0 && !pendingOrder && !isCancelling) {
      setPendingOrder({ seats: myReservedSeats });
      setShowModal(true);
    }
  }, [seats, isAuthenticated, storedUserId, pendingOrder, isCancelling]);

  const handleGoToCheckout = () => {
    navigate("/checkout", {
      state: {
        sessionId,
        selectedSeats: pendingOrder.seats,
        totalPrice: pendingOrder.seats.reduce((sum: number, s: any) => sum + s.price, 0),
        userId: Number(storedUserId),
        movieTitle: sessionData?.movie.title,
        hallName: sessionData?.hall.hallName,
        sessionDate: sessionData?.sessionDate,
        sessionTime: sessionData?.sessionTime,
        isResume: true 
      }
    });
  };

  const handleStartNew = async () => {
    if (!pendingOrder) return;
    
    try {
      setIsCancelling(true);
      setShowModal(false); 
      
      const ids = pendingOrder.seats.map((s: any) => s.id);
      setPendingOrder(null);

      // Викликаємо API для зняття броні
      await postItem(`SessionSeat/unreserve`, ids); 
      
      toast.success("Seats released");
      setTimeout(() => {
        window.location.reload(); 
      }, 500);

    } catch (e) {
      if (e instanceof SyntaxError && e.message.includes('JSON')) {
         toast.success("Seats released");
         setTimeout(() => window.location.reload(), 500);
         return;
      }
      console.error("Unreserve error:", e);
      toast.error("Failed to release seats");
      setIsCancelling(false);
    }
  };

  const handleProceed = async () => {
    if (selectedSeats.length === 0 || isReserving) return;

    if (!isAuthenticated) {
      navigate("/auth/login", { state: { from: `/sessions/${sessionId}` } });
      return;
    }

    try {
      setIsReserving(true);
      const userId = Number(storedUserId);
      
      // Бронюємо тільки ті місця, які ще не закріплені за нами в БД
      const seatsToReserve = selectedSeats.filter((s: any) => String(s.lockedByUserId) !== String(userId));
      
      if (seatsToReserve.length > 0) {
        await Promise.all(seatsToReserve.map(seat => reserveSessionSeat(seat.id, userId)));
      }

      navigate("/checkout", {
        state: {
          sessionId, selectedSeats, totalPrice, userId,
          movieTitle: sessionData?.movie.title,
          hallName: sessionData?.hall.hallName,
          sessionDate: sessionData?.sessionDate,
          sessionTime: sessionData?.sessionTime,
        }
      });
    } catch (error) {
      toast.error("Error during reservation");
    } finally {
      setIsReserving(false);
    }
  };

  if (isReserving || (isLoading && !sessionData)) return <MovieDetailsSkeleton />;
  if (!sessionData) return <div className={styles.errorContainer}><Error variant="client" /></div>;

  return (
    <div className={styles.container}>
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalIcon}>💳</div>
            <h2>Unpaid reservation found</h2>
            <p>You have {pendingOrder.seats.length} seats reserved. Pay for them or start fresh?</p>
            <div className={styles.modalActions}>
              <button onClick={handleGoToCheckout} className={styles.resumeBtn}>
                PAY FOR RESERVED
              </button>
              <button onClick={handleStartNew} className={styles.cancelBtn} disabled={isCancelling}>
                {isCancelling ? "CLEARING..." : "START NEW"}
              </button>
            </div>
          </div>
        </div>
      )}

      <aside className={styles.movieDetails}>
        <div className={styles.posterContainer}>
          <img src={sessionData.movie.posterUrl} alt={sessionData.movie.title} className={styles.mainPoster} />
        </div>
        <div className={styles.movieText}>
          <h1 className={styles.movieTitle}>{sessionData.movie.title}</h1>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}><span className={styles.label}>Hall</span><p className={styles.infoValue}>{sessionData.hall.hallName}</p></div>
            <div className={styles.infoItem}><span className={styles.label}>Date</span><p className={styles.infoValue}>{sessionData.sessionDate?.split('T')[0]}</p></div>
            <div className={styles.infoItem}><span className={styles.label}>Time</span><p className={styles.infoValue}>{sessionData.sessionTime?.slice(0, 5)}</p></div>
          </div>
        </div>
      </aside>

      <main className={styles.hallSection}>
        <div className={styles.mapContainer}>
          <HallMap
            seats={seats}
            renderSeat={(seat) => {
              const seatAny = seat as any;
              const status = String(seatAny.status).toLowerCase();
              const seatUserId = String(seatAny.lockedByUserId || ""); 
              const currentUserId = String(storedUserId);

              // Визначаємо статуси
              const isAvailable = status === "available" || status === "1";
              const isReserved = status === "reserved" || status === "3";
              const isSold = status === "sold" || status === "2";
              
              const isMine = isReserved && seatUserId === currentUserId;
              // Зайнято іншими: або чужий резерв, або вже куплено
              const isOccupiedByOthers = (isReserved && !isMine) || isSold;
              const isSelected = selectedSeats.some(s => s.id === seat.id);

              return (
                <Seat
                  id={seat.id}
                  color={
                    isSelected || isMine
                      ? "var(--seat-selected)" 
                      : isSold 
                        ? "#333333" // Колір для проданих місць
                        : isOccupiedByOthers 
                          ? "var(--seat-occupied)" 
                          : getSeatColor(typeof seat.type === 'object' ? seat.type?.name : seat.type || "")
                  }
                  onClick={() => !isOccupiedByOthers && toggleSeat(seat)}
                  className={isOccupiedByOthers ? styles.seatDisabled : ""}
                />
              );
            }}
          />
        </div>
      </main>

      <aside className={styles.checkoutSidebar}>
        <div className={styles.sidebarContent}>
          <h3 className={styles.sidebarTitle}>Your Selection</h3>
          <div className={styles.ticketsList}>
            {selectedSeats.length > 0 ? selectedSeats.map(s => (
              <div key={s.id} className={styles.ticketCard}>
                <div className={styles.ticketInfo}>Row {s.row}, Seat {s.number}</div>
                <div className={styles.ticketPrice}>{s.price} UAH</div>
                <button className={styles.removeBtn} onClick={() => toggleSeat(s)}>×</button>
              </div>
            )) : (
              <div className={styles.emptyState}><p>Pick seats on the map</p></div>
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.totalBox}>
            <span>Total:</span>
            <span className={styles.totalPrice}>{totalPrice} UAH</span>
          </div>
          <button
            className={styles.payButton}
            disabled={selectedSeats.length === 0 || isReserving}
            onClick={handleProceed}
          >
            {isAuthenticated ? "PROCEED TO PAY" : "LOGIN TO RESERVE"}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default SessionDetails;