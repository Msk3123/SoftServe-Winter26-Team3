import { useParams } from 'react-router-dom';
import { useMovie } from '../../../hooks/useMovie/useMovie'; 
import styles from './MovieDetailsPage.module.css'; 
import Badge from '../../../components/Badge/Badge';
import Button from '../../../components/Button/Button';
import { formatDuration } from '../../../helpers/timeHelper';
import MovieDetailsSkeleton from './MovieDetailsPageSkeleton';

const MovieDetails = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const { movie, isLoading, error } = useMovie(movieId);

    if (isLoading) return <MovieDetailsSkeleton/>;
    if (error || !movie) return <div className={styles.status}>{error || 'Movie not found'}</div>;

    return (
        <main className={styles.wrapper}>
            <div className={styles.container}>
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

                            {movie.genres.map(g => <Badge size='sm'>{g.name}</Badge>)}

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

                <aside className={styles.rightCol}>
                    <div className={styles.sessionsPlaceholder}>
                        <h3 className={styles.sessionsTitle}>Showtimes</h3>
                        <div className={styles.placeholderContent}>
                            <p>Coming soon...</p>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
};

export default MovieDetails;