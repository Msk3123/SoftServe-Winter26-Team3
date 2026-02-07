import type { Session } from "../../types/session.types";
import styles from "./AdminSessionCard.module.css";

interface AdminSessionCardProps{
    session:Session;
}


const formatDateTime = (date: string, time: string) => {
  const datePart = date.split("T")[0]; // 2026-02-28
  const d = new Date(`${datePart}T${time}`);

  return d.toLocaleString("uk-UA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};


const AdminSessionCard = ({ session }: AdminSessionCardProps) => {
  const { movie } = session;

  return (
    <div className={styles.card}>
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className={styles.poster}
      />

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{movie.title}</h3>
          <span className={styles.release}>
            {movie.releaseDate}
          </span>
        </div>

        <div className={styles.meta}>
            <p>Hall: {session.hall.hallName}</p>
            <p>
                Session: {formatDateTime(session.sessionDate,session.sessionTime)}
            </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSessionCard;
