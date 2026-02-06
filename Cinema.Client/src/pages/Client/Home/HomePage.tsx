import { useState, useRef, useEffect } from "react";
import styles from "./HomePage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { getRecentNews } from "../../../api/newsApi";
import Button from "../../../components/Button/Button";
import type { MovieShort } from "../../../types/movie.types";
import { getMovies } from "../../../api/movieApi";
import { getNews } from "../../../api/newsApi";
import type { NewsShort, News } from "../../../types/news.types";
import Modal from "../../../components/ClientModal/ClientModal";
const HomePage = () => {
  const [activeTab, setActiveTab] = useState<"now" | "soon">("now");
  const [movies, setMovies] = useState<MovieShort[]>([]);
  const [newsList, setNewsList] = useState<NewsShort[]>([]);
  // const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedNews, setSelectedNews] = useState<NewsShort | null>(null);
  const [fullNews, setFullNews] = useState<News | null>(null);
  // 2. Додай стейт для тексту
  const [fullContent, setFullContent] = useState<string>("");
  useEffect(() => {
    if (selectedNews) {
      setFullNews(null);
      getNews(selectedNews.id)
        .then((data) => {
          setFullNews(data);
        })
        .catch((err) => console.error("Failed to load full news:", err));
    }
  }, [selectedNews]);
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const data = await getMovies(activeTab);
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
    loadMovies();
  }, [activeTab]);
  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await getRecentNews();
        const cleanNews = response.items;

        setNewsList(cleanNews);
      } catch (error) {
        console.error("Failed to download news:", error);
      }
    };
    loadNews();
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
                  <div
                    key={movie.id}
                    className={styles.movieItem}
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  >
                    <img
                      src={movie.posterUrl || "/assets/placeholderImage.png"}
                      alt={movie.title}
                      className={styles.poster}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://static.vecteezy.com/ti/vecteur-libre/t1/22014063-disparu-image-page-pour-site-internet-conception-ou-mobile-app-conception-non-image-disponible-icone-vecteur-vectoriel.jpg";
                      }}
                    />
                    <p className={styles.title}>{movie.title}</p>
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
                <Button
                  action={() => setSelectedNews(news)}
                  className={styles.newsButton}
                  variant="fill"
                >
                  Read more
                </Button>
                <span className={styles.newsDate}>
                  {formatDate(news.publishedDate)}
                </span>
              </div>
            </div>
          ))}
          <Link to="/news" className={styles.buttonAllNews}>
            Read all news
          </Link>
        </div>
      </div>
      {selectedNews && (
        <Modal title="" onClose={() => setSelectedNews(null)}>
          <div className={styles.modalBody}>
            <div className={styles.imageContainer}>
              <img
                src={selectedNews.imageUrl || "/assets/placeholder_news.png"}
                alt={selectedNews.title}
                className={styles.newsImageModal}
              />
            </div>
            <div className={styles.infoContainer}>
              <h2 className={styles.newsTitleModal}>{selectedNews.title}</h2>
              <p className={styles.newsTextModal}>
                {fullNews ? fullNews.newsContent : selectedNews.shortContent}
              </p>
              <div className={styles.newsActionsModal}>
                {fullNews?.movie && (
                  <Link
                    to={`/movie/${fullNews.movie.id}`}
                    className={styles.modalLinkBtn}
                  >
                    About film
                  </Link>
                )}
                {fullNews?.actor && (
                  <Link
                    to={`/actor/${fullNews.actor.id}`}
                    className={styles.modalLinkBtn}
                  >
                    About actor
                  </Link>
                )}
              </div>
              <div className={styles.newsDateModal}>
                {formatDate(selectedNews.publishedDate)}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default HomePage;
