import { useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useMovie } from '../../../hooks/useMovie/useMovie'; 
import { useSession } from '../../../hooks/useSession/useSession';
import styles from './MovieDetailsPage.module.css'; 
import Badge from '../../../components/Badge/Badge';
import Button from '../../../components/Button/Button';
import { formatDuration } from '../../../helpers/timeHelper';
import MovieDetailsSkeleton from './MovieDetailsPageSkeleton';
import type { SessionShort } from '../../../types/session.types';

const MovieDetails = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const { movie, isLoading, error } = useMovie(movieId);
    
    // Початкова дата — сьогодні
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const { groupedSession, loading: isSessionsLoading } = useSession(movieId);

    // Хелпер для форматування дати у випадашці
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const today = new Date().toISOString().split('T')[0];
        
        const formatter = new Intl.DateTimeFormat('uk-UA', {
            weekday: 'short',
            day: 'numeric',
            month: 'long',
        });

        const formatted = formatter.format(date);
        return dateStr === today ? `Сьогодні, ${formatted}` : formatted;
    };

    // Отримуємо сеанси для обраної дати
    const sessionsForDay = useMemo(() => {
        return groupedSession[selectedDate] || [];
    }, [groupedSession, selectedDate]);

    if (isLoading) return <MovieDetailsSkeleton />;
    if (error || !movie) return <div className={styles.status}>{error || 'Movie not found'}</div>;

    return (
        <main className={styles.wrapper}>
            <div className={styles.container}>
                {/* Ліва колонка: Постер та Трейлер */}
                <aside className={styles.leftCol}>
                    <div className={styles.posterWrapper}>
                        <img src={movie.posterUrl} alt={movie.title} className={styles.poster} />
                        <Button 
                            variant='text-only'
                            className={styles.trailerBtn}
                            action={() => movie.trailerUrl && window.open(movie.trailerUrl, '_blank')}
                        >
                            <span className={styles.playIcon}>▶</span> Watch Trailer
                        </Button>
                    </div>
                </aside>

                {/* Центральна колонка: Інфо про фільм */}
                <section className={styles.centerCol}>
                    <h1 className={styles.title}>{movie.title}</h1>
                    
                    <div className={styles.detailsGrid}>
                        <span className={styles.label}>Rating:</span>
                        <span className={`${styles.value} ${styles.rating}`}>
                            {movie.rating} / 10
                        </span>

                        <span className={styles.label}>Year:</span>
                        <span className={styles.value}>
                            {new Date(movie.releaseDate).getFullYear()}
                        </span>

                        <span className={styles.label}>Language:</span>
                        <span className={styles.value}>{movie.language.toUpperCase()}</span>

                        <span className={styles.label}>Genre:</span>
                        <div className={`${styles.value} ${styles.badgeContainer}`}>
                            {movie.genres.map(g => (
                                <Badge key={g.id} size='sm'>{g.name}</Badge>
                            ))}
                        </div>

                        <span className={styles.label}>Duration:</span>
                        <span className={styles.value}>{formatDuration(movie.duration)}</span>

                        <span className={styles.label}>Actors:</span>
                        <span className={styles.value}>
                            {movie.actors && movie.actors.length > 0 
                                ? movie.actors.map(a => `${a.firstName} ${a.lastName}`).join(', ') 
                                : 'No info'}
                        </span>
                    </div>

                    <div className={styles.description}>
                        <p>{movie.description}</p>
                    </div>
                </section>

                {/* Права колонка: Розклад сеансів */}
                <aside className={styles.rightCol}>
                    <div className={styles.sessionsContainer}>
                        <h3 className={styles.sessionsTitle}>Showtimes</h3>
                        
                        <div className={styles.selectWrapper}>
                            <select 
                                className={styles.dateSelect}
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            >
                                {Object.keys(groupedSession).map(date => (
                                    <option key={date} value={date}>
                                        {formatDate(date)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.sessionsList}>
                            {isSessionsLoading ? (
                                <p className={styles.infoText}>Loading sessions...</p>
                            ) : sessionsForDay.length > 0 ? (
                                sessionsForDay.map((session: SessionShort) => (
                                    <div key={session.id} className={styles.sessionCard}>
                                        <div className={styles.sessionMainInfo}>
                                            <span className={styles.time}>
                                                {session.sessionTime.slice(0, 5)}
                                            </span>
                                            <span className={styles.hall}>{session.hallName}</span>
                                        </div>
                                        <Button variant="outline" className={styles.buyBtn}>
                                            Buy
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <p className={styles.infoText}>No sessions for this date</p>
                            )}
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
};

export default MovieDetails;