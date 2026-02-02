import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SessionsPage.module.css";
import type { SessionShort } from "../../../types/session.types";
import { getAllSessions } from "../../../api/sessionApi";

const getNextDays = (daysCount: number) => {
  const days = [];
  const today = new Date();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];
  for (let i = 0; i < daysCount; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const localDateString = `${year}-${month}-${day}`;
    days.push({
      id: i,
      dateStr: `${date.getDate()} ${months[date.getMonth()]}`,
      dayName: weekDays[date.getDay()],
      fullDate: localDateString,
    });
  }
  return days;
};

const SessionsPage = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [allSessions, setAllSessions] = useState<SessionShort[]>([]);
  const [displayedSessions, setDisplayedSessions] = useState<SessionShort[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const dates = useMemo(() => getNextDays(7), []);

  useEffect(() => {
    if (dates.length > 0) {
      setSelectedDate(dates[0].fullDate);
    }
  }, [dates]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const data = await getAllSessions({
          page: 1,
          pageSize: 1000,
          sortBy: "id",
          order: "asc",
        });
        setAllSessions(data.items);
      } catch (error) {
        console.error("Failed to download sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);
  useEffect(() => {
    if (!selectedDate) return;
    const daySessions = allSessions.filter(
      (item) => item.sessionDate.split("T")[0] === selectedDate,
    );

    setDisplayedSessions(daySessions);
  }, [selectedDate, allSessions]);

  const uniqueHalls = Array.from(
    new Set(displayedSessions.map((s) => s.hallName)),
  ).sort();
  const navigate = useNavigate();
  const renderContent = () => {
    if (loading) {
      return <div className={styles.loadingMessage}>Loading schedule...</div>;
    }

    if (uniqueHalls.length === 0) {
      return (
        <div className={styles.noSessionsMessage}>
          <p style={{ color: "var(--text-inactive)" }}>
            No sessions found for this date :(
          </p>
        </div>
      );
    }
    return uniqueHalls.map((hall) => (
      <div key={hall} className={styles.sessionHallRow}>
        <div className={styles.hallTitleWrapper}>
          <h2 className={styles.hallTitle}>{hall}</h2>
        </div>
        <div className={styles.sessionInfo}>
          {displayedSessions
            .filter((s) => s.hallName === hall)
            .sort((a, b) => {
              const [h1, m1] = a.sessionTime.split(":").map(Number);
              const [h2, m2] = b.sessionTime.split(":").map(Number);
              return h1 * 60 + m1 - (h2 * 60 + m2);
            })
            .map((session) => (
              <div
                key={session.id}
                className={styles.sessionCard}
                onClick={() => navigate(`/sessions/${session.id}`)}>
                <span className={styles.sessionTime}>
                  {session.sessionTime.slice(0, 5)}
                </span>
                <Link
                  to={`/movie/${session.movieId}`}
                  className={styles.movieTitleLink}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className={styles.sessionMovieName}>
                    {session.movieTitle}
                  </span>
                </Link>
                <span className={styles.sessionMoviePlaces}>Seat Available</span>
              </div>
            ))}
        </div>
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Session</h1>
      </div>

      <div className={styles.sessionDateRow}>
        {dates.map((item) => (
          <div
            key={item.id}
            className={`${styles.dateCard} ${item.fullDate === selectedDate ? styles.activeDate : ""}`}
            onClick={() => setSelectedDate(item.fullDate)}
          >
            <span className={styles.sessionDate}>{item.dateStr}</span>
            <span className={styles.sessionDay}>{item.dayName}</span>
          </div>
        ))}
      </div>

      <section
        className={styles.sessionsSection}
        style={{ opacity: loading ? 0.5 : 1, transition: "opacity 0.2s" }}
      >
        {renderContent()}
      </section>
    </div>
  );
};

export default SessionsPage;