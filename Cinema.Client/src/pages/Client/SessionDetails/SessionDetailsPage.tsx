import { useParams, useNavigate } from "react-router-dom";
import styles from "./SessionDetailsPage.module.css";
import useSessionHallMap from "../../../hooks/useSessionHallMap/useSessionHallMap";
import { SeatStatus, type SessionSeat } from "../../../types/sessionSeat.types";
import HallMap from "../../../components/HallMap/HallMap/HallMap";
import Seat from "../../../components/HallMap/Seat/Seat";
import { getSeatColor } from "../../../features/admin/halls/helpers/getSeatColor";
import Error from "../../../components/Error/Error";
import { useState, useMemo } from "react";
import MovieDetailsSkeleton from "../MovieDetails/MovieDetailsPageSkeleton";
import { reserveSessionSeat } from "../../../api/sessionSeatApi";
import toast from "react-hot-toast";
import { getUserIdFromToken } from "../../../helpers/authHelper";

const SessionDetails = () => {
  const [isReserving, setIsReserving] = useState(false);
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();

  // 1. Статус авторизації
  const token = localStorage.getItem("accessToken");
  const storedUserId = getUserIdFromToken();
  const isAuthenticated = !!(token && storedUserId);

  // 2. Дані сесії
  const {
    sessionData,
    seats,
    selectedSeats,
    totalPrice,
    isLoading,
    toggleSeat
  } = useSessionHallMap(sessionId || "");

  // 3. Динамічна легенда (без змін)
  const legendItems = useMemo(() => {
    if (!seats || seats.length === 0) return [];
    const flatSeats = seats.flat();
    const uniqueTypeNames = Array.from(new Set(
      flatSeats.map(s => typeof s.type === 'object' ? s.type?.name : s.type).filter(Boolean)
    ));

    return uniqueTypeNames.map(name => {
      const typeName = name as string;
      const seatSample = flatSeats.find(s =>
        (typeof s.type === 'object' ? s.type?.name : s.type) === typeName
      );
      return {
        id: (typeof seatSample?.type === 'object' ? seatSample.type.id : typeName) || typeName,
        name: typeName,
        price: seatSample?.price || 0,
        color: getSeatColor(typeName)
      };
    }).sort((a, b) => a.price - b.price);
  }, [seats]);

  // 4. ОНОВЛЕНА ЛОГІКА: Перехід до оплати / Логін
  const handleProceed = async () => {
    if (selectedSeats.length === 0 || isReserving) return;

    // ЯКЩО НЕ АВТОРИЗОВАНИЙ (Варіант Б)
    if (!isAuthenticated) {
      // Зберігаємо вибір у localStorage, щоб Login.tsx міг його підхопити
      const pendingReservation = {
        sessionId: Number(sessionId),
        seats: selectedSeats,
        movieTitle: sessionData?.movie.title,
        hallName: sessionData?.hall.hallName,
        totalPrice,
        sessionDate: sessionData?.sessionDate,
        sessionTime: sessionData?.sessionTime
      };

      localStorage.setItem('pending_reservation', JSON.stringify(pendingReservation));
      
      toast("Please log in to secure your seats", { icon: '🔑' });
      
      // Відправляємо на логін, передаючи current path, щоб повернутися назад
      navigate("/auth/login", { 
        state: { from: `/sessions/${sessionId}` } 
      });
      return;
    }

    // ЯКЩО АВТОРИЗОВАНИЙ — Бронюємо відразу
    try {
      setIsReserving(true);
      const userId = Number(storedUserId);

      // Викликаємо резервацію на бекенді для кожного місця
      await Promise.all(
        selectedSeats.map(seat => reserveSessionSeat(seat.id, userId))
      );

      navigate("/checkout", {
        state: {
          sessionId,
          selectedSeats,
          totalPrice,
          movieTitle: sessionData?.movie.title,
          hallName: sessionData?.hall.hallName,
          sessionDate: sessionData?.sessionDate,
          sessionTime: sessionData?.sessionTime,
          userId
        }
      });
    } catch (error: any) {
      toast.error("Failed to reserve seats. They might be already taken.");
    } finally {
      setIsReserving(false);
    }
  };

  const getDisplayColor = (seat: SessionSeat, isSelected: boolean): string => {
    if (isSelected) return "var(--seat-selected)";
    const status = String(seat.status).toLowerCase();
    if (status !== "available") return "var(--seat-occupied)";
    const typeName = typeof seat.type === 'object' ? seat.type?.name : seat.type;
    return getSeatColor(typeName || "");
  };

  if (isReserving || (isLoading && !sessionData)) return <MovieDetailsSkeleton />;
  if (!sessionData) return <div className={styles.errorContainer}><Error variant="client" /></div>;

  return (
    <div className={styles.container}>
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
          {legendItems.map((item) => (
            <div key={item.id} className={styles.legendItem}>
              <span className={styles.box} style={{ background: item.color }}></span>
              <span className={styles.legendText}>{item.name.toUpperCase()} - {item.price} UAH</span>
            </div>
          ))}
          <div className={styles.legendItem}>
            <span className={styles.box} style={{ background: "var(--seat-occupied)" }}></span>
            <span className={styles.legendText}>OCCUPIED</span>
          </div>
        </div>

        <div className={styles.screenWrapper}>
          <div className={styles.screenLine}></div>
          <span className={styles.screenText}>SCREEN</span>
        </div>

        <div className={styles.mapContainer}>
          <HallMap
            seats={seats}
            renderSeat={(seat) => (
              <Seat
                id={seat.id}
                color={getDisplayColor(seat, selectedSeats.some(s => s.id === seat.id))}
                onClick={() => seat.status === SeatStatus.Available && toggleSeat(seat)}
                className={seat.status !== SeatStatus.Available ? styles.seatDisabled : ""}
              />
            )}
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
              <div className={styles.emptyState}><p>Pick your seats on the map</p></div>
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