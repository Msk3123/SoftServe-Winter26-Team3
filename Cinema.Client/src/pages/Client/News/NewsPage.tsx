import styles from "./NewsPage.module.css";
import { useState, useEffect } from "react";
import { getRecentNews, getNews } from "../../../api/newsApi";
import type { NewsShort, News } from "../../../types/news.types";
import Modal from "../../../components/ClientModal/ClientModal";
import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";

const NewsPage = () => {
  const [selectedNews, setSelectedNews] = useState<NewsShort | null>(null);
  const [fullNews, setFullNews] = useState<News | null>(null);
  const [newsList, setNewsList] = useState<NewsShort[]>([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uk-UA");
  };

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await getRecentNews();
        setNewsList(response.items);
      } catch (error) {
        console.error("Failed to download news:", error);
      }
    };
    loadNews();
  }, []);

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

  const visibleNews = [...newsList].sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
  );

  return (
    <div className={styles.container}>
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
                {fullNews?.movie &&
                fullNews.movie.map(movie=>(
                  <Link
                    to={`/movie/${movie.id}`}
                    className={styles.modalLinkBtn}
                  >
                    {movie.title}
                  </Link>
                ))
                }
                {fullNews?.actor &&
                fullNews.actor.map(actor=> (
                  <Link
                    to={`/actor/${actor.id}`}
                    className={styles.modalLinkBtn}
                  >
                    {actor.firstName} {actor.lastName}
                  </Link>
                )
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

export default NewsPage;
