import React, { useState, useRef, useEffect } from "react";
import styles from "./HomePage.module.css";
interface Movie {
  id: number;
  movieTitle: string;
  posterUrl: string;
}
interface News {
  id: number;
  title: string;
  // newsContent: string;
  shortContent: string;
  imageUrl: string;
  publishedDate: string;
}
interface MovieApiResponse {
  items: Movie[];
  totalCount: number;
}
const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"now" | "soon">("now");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const endpoint =
          activeTab === "now"
            ? "https://localhost:7249/api/Movie/now-showing"
            : "https://localhost:7249/api/Movie/upcoming";

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: MovieApiResponse = await response.json();
        if (data.items.length === 0) {
          console.warn("Warning: The server returned an empty list of movies!");
        }
        setMovies(data.items);
      } catch (error) {
        console.error("Failed to download movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [activeTab]);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("https://localhost:7249/api/News");
        if (!response.ok) throw new Error("Failed to fetch news");
        const data = await response.json();
        // console.log("Новини з сервера:", data);
        const newsData = data.items ? data.items : data;
        setNewsList(newsData);
      } catch (error) {
        console.error("Не вдалося завантажити новини:", error);
      }
    };
    fetchNews();
  }, []);
  const scroll = (direction: "left" | "right") => {
    if (listRef.current) {
      const scrollAmount = 580;
      const currentScroll = listRef.current.scrollLeft;
      if (direction === "left") {
        if (currentScroll - scrollAmount <= 0) {
          listRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          listRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
      } else {
        listRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uk-UA");
  };
  const truncateText = (text: string, limit: number) => {
    if (!text) return "";
    if (text.length <= limit) return text;
    const subString = text.slice(0, limit);
    const lastSpaceIndex = subString.lastIndexOf(" ");
    if (lastSpaceIndex > 0) {
      return subString.slice(0, lastSpaceIndex) + "...";
    }
    return subString + "...";
  };
  const visibleNews = [...newsList]
    .sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime(),
    )
    .slice(0, 3);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.headerWrapper}>
          <h1
            className={
              activeTab === "now" ? styles.activeHeader : styles.inactiveHeader
            }
            onClick={() => setActiveTab("now")}
          >
            Now showing
          </h1>
        </div>
        <div className={styles.carouselContainer}>
          <div className={styles.movieList}>
            <button className={styles.navButton} onClick={() => scroll("left")}>
              <img
                src="../src/assets/arrowLeft.png"
                alt="Left"
                className={styles.arrow}
              />
            </button>
            <div className={styles.movieList} ref={listRef}>
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <div key={movie.id} className={styles.movieItem}>
                    <img
                      src={movie.posterUrl || "/assets/placeholderImage.png"}
                      alt={movie.movieTitle}
                      className={styles.poster}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://static.vecteezy.com/ti/vecteur-libre/t1/22014063-disparu-image-page-pour-site-internet-conception-ou-mobile-app-conception-non-image-disponible-icone-vecteur-vectoriel.jpg";
                      }}
                    />
                    <p className={styles.title}>{movie.movieTitle}</p>
                  </div>
                ))
              ) : loading ? null : (
                <p style={{ color: "var(--text-inactive)" }}>
                  No movies found via API :(
                </p>
              )}
            </div>
            <button
              className={styles.navButton}
              onClick={() => scroll("right")}
            >
              <img
                src="../src/assets/arrowRight.png"
                alt="Right"
                className={styles.arrow}
              />
            </button>
          </div>
        </div>
        <div className={styles.headerWrapper}>
          <h2
            className={
              activeTab === "soon" ? styles.activeHeader : styles.inactiveHeader
            }
            onClick={() => setActiveTab("soon")}
          >
            Soon
          </h2>
        </div>
        <div>
          <h3 className={styles.headerNews}>News</h3>
        </div>
        <div className={styles.newsContainer}>
          {visibleNews.map((news) => (
            <div key={news.id} className={styles.newsSection}>
              <img
                src={news.imageUrl || "/assets/placeholder_news.png"}
                alt="News Thumbnail"
                className={styles.newsImage}
              />
              <div className={styles.newsText}>
                <h4 className={styles.newsTitle}>{news.title}</h4>
                <p className={styles.newsDesc}>
                  {truncateText(news.shortContent, 147)}
                </p>
              </div>
              <div className={styles.newsDetailedInfo}>
                <button className={styles.newsButton}>Read more</button>
                <span className={styles.newsDate}>
                  {formatDate(news.publishedDate)}
                </span>
              </div>
            </div>
          ))}
          <a href="/news" className={styles.buttonAllNews}>
            Read all news
          </a>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
