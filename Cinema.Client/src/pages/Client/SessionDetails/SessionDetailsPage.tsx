import { useParams, useNavigate } from "react-router-dom"; 
import styles from "./SessionDetailsPage.module.css";
import useSessionHallMap from "../../../hooks/useSessionHallMap/useSessionHallMap";
import { SeatStatus, type SessionSeat } from "../../../types/sessionSeat.types";
import HallMap from "../../../components/HallMap/HallMap/HallMap";
import Seat from "../../../components/HallMap/Seat/Seat";
import { getSeatColor } from "../../../features/admin/halls/helpers/getSeatColor";
import Error from "../../../components/Error/Error";

const SessionDetails = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  
  const { 
    sessionData, 
    seats, 
    selectedSeats, 
    totalPrice, 
    isLoading, 
    toggleSeat 
  } = useSessionHallMap(sessionId || "");

 const getDynamicLegend = () => {
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
  };
const handleProceed = () => {
    if (selectedSeats.length === 0) return;


    navigate("/checkout", {
      state: {
        sessionId: sessionId,
        selectedSeats: selectedSeats,
        movieTitle: sessionData?.movie.title,
        hallName: sessionData?.hall.hallName,
        totalPrice: totalPrice,
        sessionDate: sessionData?.sessionDate,
        sessionTime: sessionData?.sessionTime
      }
    });
  };
  const legendItems = getDynamicLegend();

  const getDisplayColor = (seat: SessionSeat, isSelected: boolean): string => {
    if (isSelected) return "var(--seat-selected)";
    if (seat.status !== SeatStatus.Available) return "var(--seat-occupied)";
    
    const typeName = typeof seat.type === 'object' ? seat.type?.name : seat.type;
    return getSeatColor(typeName || "");
  };
    console.log("Seats data:", seats);
  if (isLoading || !sessionData) return <div className={styles.loader}>Loading...</div>;
  if(sessionData.seats.length<1){
    return<Error variant="client"></Error>
  }
  return (
    <div className={styles.container}>
      <aside className={styles.movieDetails}>
        <img 
          src={sessionData.movie.posterUrl} 
          alt={sessionData.movie.title} 
          className={styles.mainPoster} 
        />
        <div className={styles.movieText}>
          <h1 className={styles.movieTitle}>{sessionData.movie.title}</h1>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Hall</span>
              <p className={styles.infoValue}>{sessionData.hall.hallName}</p>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Date</span>
              <p className={styles.infoValue}>
                {sessionData.sessionDate ? sessionData.sessionDate.split('T')[0] : "—"}
              </p>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Time</span>
              <p className={styles.infoValue}>
                {sessionData.sessionTime?.slice(0, 5) || "10:00"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Center Content: Hall Map */}
      <main className={styles.hallSection}>
        {/* ЛЕГЕНДА ТЕПЕР ТУТ І ВОНА ПРАЦЮЄ */}
        <div className={styles.legendTop}>
          {legendItems.map((item) => (
            <div key={item.id} className={styles.legendItem}>
              <span 
                className={styles.box} 
                style={{ background: item.color }}
              ></span> 
              <span className={styles.legendText}>
                {item.name.toUpperCase()} - {item.price} UAH
              </span>
            </div>
          ))}
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
          <h3 className={styles.sidebarTitle}>Your Tickets</h3>
          <div className={styles.ticketsList}>
            {selectedSeats.length > 0 ? (
              selectedSeats.map(s => (
                <div key={s.id} className={styles.ticketCard}>
                   <div className={styles.ticketInfo}>
                     Row {s.row}, Seat {s.number}
                   </div>
                   <div className={styles.ticketPrice}>{s.price} UAH</div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>
                  Pick your seats on the map.<br/>
                  Direct entry with online ticket!
                </p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.totalBox}>
            <span>Total to pay:</span>
            <span className={styles.totalPrice}>{totalPrice} UAH</span>
          </div>
          <button 
            className={styles.payButton}
            disabled={selectedSeats.length === 0}
            onClick={handleProceed} 
          >
            PROCEED TO PAY
          </button>
        </div>
      </aside>
    </div>
  );
};

export default SessionDetails;