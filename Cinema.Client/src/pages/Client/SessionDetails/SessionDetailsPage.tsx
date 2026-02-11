import { useParams, useNavigate } from "react-router-dom";
import styles from "./SessionDetailsPage.module.css";
import useSessionHallMap from "../../../hooks/useSessionHallMap/useSessionHallMap";
import HallMap from "../../../components/HallMap/HallMap/HallMap";
import Seat from "../../../components/HallMap/Seat/Seat";
import { getSeatColor } from "../../../features/admin/halls/helpers/getSeatColor";
import Error from "../../../components/Error/Error";
import { useState, useEffect, useMemo, useCallback } from "react";
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

  // Динамічна легенда типів крісел
  const dynamicLegendTypes = useMemo(() => {
    if (!seats) return [];
    const flatSeats = seats.flat();
    const types = new Set<string>();
    
    flatSeats.forEach((seat: any) => {
      const typeName = typeof seat.type === 'object' ? seat.type?.name : seat.type;
      if (typeName && !["Standard", "Regular", "Base"].includes(typeName)) {
        types.add(typeName);
      }
    });
    
    return Array.from(types);
  }, [seats]);

  // Перевірка на наявність незавершених бронювань
  useEffect(() => {
    if (!isAuthenticated || !storedUserId || !seats || seats.length === 0 || isCancelling || showModal) return;
    
    const flatSeats = seats.flat();
    const currentUserId = String(storedUserId);
    
    const myReservedSeats = flatSeats.filter((seat: any) => {
      const status = String(seat.status).toLowerCase();
      const seatUserId = String(seat.lockedByUserId || "");
      // "3" або "reserved" — статус активного бронювання
      return (status === "reserved" || status === "3") && seatUserId === currentUserId;
    });

    if (myReservedSeats.length > 0 && !pendingOrder) {
      setPendingOrder({ seats: myReservedSeats });
      setShowModal(true);
    }
  }, [seats, isAuthenticated, storedUserId, isCancelling, showModal, pendingOrder]);

  // ПЕРЕХІД ДО ОПЛАТИ
  const handleGoToCheckout = useCallback(() => {
    if (!pendingOrder) return;
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
  }, [pendingOrder, sessionId, storedUserId, sessionData, navigate]);

  // СКАСУВАННЯ ТА ОЧИЩЕННЯ (Виправлено для уникнення помилки Failed to release)
  const handleStartNew = async () => {
    if (!pendingOrder || isCancelling) return;
    
    const toastId = toast.loading("Releasing your seats...");
    try {
      setIsCancelling(true);
      const ids = pendingOrder.seats.map((s: any) => s.id);
      
      setShowModal(false);
      
      // Намагаємось очистити місця через бекенд
      // Переконайся, що SessionSeat/unreserve приймає масив ID
      await postItem(`SessionSeat/unreserve`, ids); 
        
      
      setPendingOrder(null);
      toast.success("Seats are now available", { id: toastId });

      // Форсуємо оновлення мапи після очищення
      window.location.reload(); 
    } catch (e) {
      console.error("Unreserve error:", e);
      toast.error("Could not release seats. They might be tied to an order.", { id: toastId });
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

      // Бронюємо лише ті, які ще не мають статусу Reserved для нас
      const seatsToReserve = selectedSeats.filter((s: any) => {
        const status = String(s.status).toLowerCase();
        const isAlreadyMine = (status === "reserved" || status === "3") && String(s.lockedByUserId) === String(userId);
        return !isAlreadyMine;
      });

      if (seatsToReserve.length > 0) {
        await Promise.all(seatsToReserve.map(seat => reserveSessionSeat(seat.id, userId)));
      }

      navigate("/checkout", {
        state: {
          sessionId,
          selectedSeats,
          totalPrice,
          userId,
          movieTitle: sessionData?.movie.title,
          hallName: sessionData?.hall.hallName,
          sessionDate: sessionData?.sessionDate,
          sessionTime: sessionData?.sessionTime,
          isResume: false 
        }
      });
    } catch (error) {
      console.error("Reservation error:", error);
      toast.error("Some seats were already taken. Refreshing...");
      window.location.reload();
    } finally {
      setIsReserving(false);
    }
  };

  if (isReserving || (isLoading && !sessionData)) return <MovieDetailsSkeleton />;
  if (!sessionData) return <div className={styles.errorContainer}><Error variant="client" /></div>;

  return (
    <div className={styles.container}>
      {/* Modal for pending reservations */}
      {showModal && pendingOrder && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalIcon}>💳</div>
            <h2>Unpaid reservation found</h2>
            <p>You have {pendingOrder.seats.length} seats reserved. Pay for them or start fresh?</p>
            <div className={styles.modalActions}>
              <button onClick={handleGoToCheckout} className={styles.resumeBtn}>
                PAY FOR RESERVED
              </button>
              <button 
                onClick={handleStartNew} 
                className={styles.cancelBtn} 
                disabled={isCancelling}
              >
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
        <div className={styles.legendTop}>
          {dynamicLegendTypes.map(type => (
            <div key={type} className={styles.legendItem}>
              <span className={styles.box} style={{ backgroundColor: getSeatColor(type) }}></span>
              <span>{type}</span>
            </div>
          ))}
          <div className={styles.legendItem}>
            <span className={styles.box} style={{ backgroundColor: "#333333" }}></span>
            <span>Occupied</span>
          </div>
        </div>

        <div className={styles.screenWrapper}>
            <div className={styles.screenLine}></div>
            <span className={styles.screenText}>SCREEN</span>
        </div>

        <div className={styles.mapContainer}>
          <HallMap
            seats={seats}
            renderSeat={(seat) => {
              const seatAny = seat as any;
              const status = String(seatAny.status).toLowerCase();
              
              const isMine = (status === "reserved" || status === "3") && String(seatAny.lockedByUserId) === String(storedUserId);
              const isOccupied = (status === "reserved" && !isMine) || (status === "3" && !isMine) || status === "sold" || status === "2";
              const isSelected = selectedSeats.some(s => s.id === seat.id);
              const typeName = typeof seat.type === 'object' ? seat.type?.name : (seat.type || "Standard");

              return (
                <Seat
                  id={seat.id}
                  color={
                    isSelected || isMine ? "var(--seat-selected)" 
                    : isOccupied ? "#333333" 
                    : getSeatColor(typeName)
                  }
                  onClick={() => !isOccupied && toggleSeat(seat)}
                  className={isOccupied ? styles.seatDisabled : ""}
                />
              );
            }}
          />
        </div>
      </main>

      <aside className={styles.checkoutSidebar}>
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
            {!isAuthenticated ? "LOGIN TO RESERVE" : isReserving ? "RESERVING..." : "PROCEED TO PAY"}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default SessionDetails;