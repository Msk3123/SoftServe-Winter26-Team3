import styles from "./Footer.module.css";

const Footer : React.FC = ()=>{
    return(
    <footer className={styles.footer}>
        <div className={styles.footerContainer}>
            <div className={styles.footerColumn}>
                <h3>Cinema App</h3>
                <p>Твій найкращий досвід перегляду фільмів.</p>
                <p className={styles.copyright}>© 2026 Всі права захищені.</p>
            </div>


            <div className={styles.footerColumn}>
                <h4>Навігація</h4>
                <ul>
                    <li><a href="/">Головна</a></li>
                    <li><a href="/movies">Фільми</a></li>
                    <li><a href="/schedule">Розклад</a></li>
                </ul>
            </div>

            <div className={styles.footerColumn}>
                <h4>Контакти</h4>
                <p>Email: support@cinema.ua</p>
                <p>Тел: +380 99 999 99 99</p>
                <div className={styles.socials}>
                    <a href="#">Instagram</a>
                    <a href="#">Telegram</a>
                </div>
            </div>
        </div>
    </footer>
    );
};

export default Footer;