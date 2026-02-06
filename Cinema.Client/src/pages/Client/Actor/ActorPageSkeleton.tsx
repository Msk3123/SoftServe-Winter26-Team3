import React from 'react';
import styles from './ActorPage.module.css';

const ActorPageSkeleton = () => {
    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <aside className={styles.leftColumn}>
                    <div className={`${styles.filmographyCard} ${styles.skeletonCard}`}>
                        <div className={`${styles.skeleton} ${styles.skeletonTitle}`} style={{ width: '50%' }} />
                        <div className={styles.movieList}>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className={`${styles.skeleton} ${styles.skeletonText}`} style={{ height: '40px', marginBottom: '8px' }} />
                            ))}
                        </div>
                    </div>
                </aside>
                <main className={styles.mainContent}>
                    <div className={styles.actorHeader}>
                        <div className={styles.imageWrapper}>
                            <div className={`${styles.skeleton} ${styles.skeletonPhoto}`} />
                        </div>
                        <div className={styles.actorInfo}>
                            <div className={`${styles.skeleton} ${styles.skeletonTitle}`} style={{ height: '3rem', width: '60%', marginBottom: '20px' }} />
                            <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '30%', marginBottom: '30px' }} />
                            <div className={styles.biographySection}>
                                <div className={`${styles.skeleton} ${styles.skeletonTitle}`} style={{ width: '20%', marginBottom: '15px' }} />
                                <div className={`${styles.skeleton} ${styles.skeletonText}`} />
                                <div className={`${styles.skeleton} ${styles.skeletonText}`} />
                                <div className={`${styles.skeleton} ${styles.skeletonText}`} />
                                <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '80%' }} />
                            </div>
                        </div>
                    </div>
                </main>

            </div>
        </div>
    );
};

export default ActorPageSkeleton;