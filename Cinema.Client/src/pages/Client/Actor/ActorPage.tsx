import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './ActorPage.module.css';
import { useActor } from '../../../hooks/useActor/useActor';
import ActorPageSkeleton from './ActorPageSkeleton';

const ActorPage: React.FC = () => {
    const { actorId } = useParams<{ actorId: string }>();
    const { actor, isLoading, error } = useActor(actorId);

    if (isLoading) return <ActorPageSkeleton />;
    
    if (error || !actor) {
        return (
            <div className={styles.container}>
                <div className={styles.center}>
                    {error || `Actor not found (ID: ${actorId})`}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <main className={styles.mainContent}>
                    <div className={styles.actorHeader}>
                        <div className={styles.imageWrapper}>
                            <img 
                                src={actor.photoUrl || 'https://via.placeholder.com/300x450'} 
                                alt={`${actor.firstName} ${actor.lastName}`} 
                                className={styles.actorPhoto} 
                            />
                        </div>

                        <div className={styles.actorInfo}>
                            <h1 className={styles.name}>{actor.firstName} {actor.lastName}</h1>
                            
                            <div className={styles.metaData}>
                                <div className={styles.metaRow}>
                                    <span className={styles.label}>Birthday:</span>
                                    <span className={styles.value}>
                                        {actor.birthday ? new Date(actor.birthday).toLocaleDateString('uk-UA') : 'N/A'}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.biographySection}>
                                <h3 className={styles.bioTitle}>Biography</h3>
                                <p className={styles.biography}>
                                    {actor.biography}
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
                <aside className={styles.rightColumn}>
                    <div className={styles.filmographyCard}>
                        <h3 className={styles.sectionTitle}>FILMOGRAPHY</h3>
                        
                        <div className={styles.movieList}>
                            {actor.movies && actor.movies.length > 0 ? (
                                actor.movies.map((movie) => (
                                    <Link to={`/movie/${movie.id}`} key={movie.id} className={styles.movieItem}>
                                        <div className={styles.movieTitle}>{movie.title}</div>
                                    </Link>
                                ))
                            ) : (
                                <div className={styles.emptyState}>No movies found</div>
                            )}
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
};

export default ActorPage;