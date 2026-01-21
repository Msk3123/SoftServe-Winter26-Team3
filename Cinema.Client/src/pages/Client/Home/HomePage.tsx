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
    desc: "After 6 years of silence about Caribbean films, now we have official announcement...",
    image: "../images/news/johnnyDepp.png", // Виправлена папка news та ім'я файлу
    date: "27.12.2025",
  },
  {
    id: 2,
    title: "Zootopia 2 Eyes $1 Billion Global Revenue.",
    desc: "The long-awaited sequel has exceeded all expectations, earning over $150 million...",
    image: "../images/news/zootopia2Poster.jpg", // Перевір, чи там jpg чи png
    date: "22.12.2025",
  },
];
// carousel functionality?
//ADD HOVER!
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
                <h4>{news.title}</h4>
                <p>{news.desc}</p>
              </div>
              <div className={styles.newsButton}>
                <button>Read more</button>
                <span>{news.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
