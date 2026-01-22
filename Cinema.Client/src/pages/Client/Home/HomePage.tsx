import styles from "./HomePage.module.css";

const movies = [
  {
    id: 1,
    title: "Furiosa",
    image: "../images/posters/furiosaPoster.png",
  },
  {
    id: 2,
    title: "IF",
    image: "../images/posters/ifPoster.png",
  },
  {
    id: 3,
    title: "Civil War",
    image: "../images/posters/civilWarPoster.png",
  },
  {
    id: 4,
    title: "Kingdom of the Planet of the Apes",
    image: "../images/posters/kingdomPlanetPoster.png",
  },
];
const newsList = [
  {
    id: 1,
    title: 'Johnny Depp will star in the film "Pirates of the Caribbean 6."',
    desc: "After 6 years of silence about Caribbean films, now we have official announcement. That`s incredible producer Volodymyr Zelensky, the president of Kvartal 95...",
    image: "../images/news/johnnyDepp.png",
  },
  {
    id: 2,
    title: "Zootopia 2 Eyes $1 Billion Global Revenue.",
    desc: "The long-awaited sequel has exceeded all expectations, earning over $150 million in its opening weekend alone. Analysts predict it will be the biggest animated hit of the year...",
    image: "../images/news/zootopia2Poster.jpg",
    date: "22.12.2025",
  },
];
// carousel functionality?
const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <h3 className={styles.header}>Now showing</h3>
          {/* button? */}
        </div>
        <div className={styles.movieList}>
          <img
            src="../src/assets/arrowLeft.png"
            alt="Left Arrow"
            className={styles.arrow}
          />
          {movies.map((movie) => (
            <div key={movie.id} className={styles.movieItem}>
              <img
                src={movie.image}
                alt={movie.title}
                className={styles.poster}
              />
              <p className={styles.title}>{movie.title}</p>
            </div>
          ))}
          <img
            src="../src/assets/arrowRight.png"
            alt="Right Arrow"
            className={styles.arrow}
          />
        </div>
        <div>
          <h3 className={styles.headerOff}>Soon</h3>
        </div>
        <div>
          <h3 className={styles.headerNews}>News</h3>
        </div>
        <div className={styles.newsContainer}>
          {newsList.map((news) => (
            <div key={news.id} className={styles.newsSection}>
              <img
                src={news.image}
                alt="News Thumbnail"
                className={styles.newsImage}
              />
              <div className={styles.newsText}>
                <h4 className={styles.newsTitle}>{news.title}</h4>
                <p className={styles.newsDesc}>{news.desc}</p>
              </div>
              <div className={styles.newsDetailedInfo}>
                <button className={styles.newsButton}>Read more</button>
                <span className={styles.newsDate}>{news.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
