import React from 'react';
import styles from './MovieDetailsPage.module.css'; 
const MovieDetailsSkeleton = () => (
    <main className={styles.wrapper}>
        <div className={styles.container}>
            <aside className={styles.leftCol}>
                <div className={`${styles.skeleton} ${styles.posterSkeleton}`} />
                <div className={`${styles.skeleton}`} style={{ height: '3rem', marginTop: '1.5rem', borderRadius: '8px' }} />
            </aside>

            <section className={styles.centerCol}>
                <div className={`${styles.skeleton} ${styles.titleSkeleton}`} />
                
                <div className={styles.detailsGrid}>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <React.Fragment key={i}>
                            <div className={`${styles.skeleton}`} style={{ width: '80px', height: '1rem' }} />
                            <div className={`${styles.skeleton} ${styles.specSkeleton}`} />
                        </React.Fragment>
                    ))}
                </div>

                <div style={{ marginTop: '2rem' }}>
                    <div className={`${styles.skeleton} ${styles.textLineSkeleton}`} />
                    <div className={`${styles.skeleton} ${styles.textLineSkeleton}`} />
                    <div className={`${styles.skeleton} ${styles.textLineSkeleton}`} style={{ width: '80%' }} />
                </div>
            </section>

            <aside className={styles.rightCol}>
                <div className={`${styles.skeleton}`} style={{ height: '300px', borderRadius: '16px' }} />
            </aside>
        </div>
    </main>
);

export default MovieDetailsSkeleton;