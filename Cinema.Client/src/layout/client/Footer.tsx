import styles from "./Footer.module.css";

const Footer = ()=>{
    return(
    <footer className={styles.footer}>
        <div className={styles.footerContainer}>
            <div className={styles.footerColumn}>
                <h3>Cinemas App</h3>
                <p>Your best cinema experience</p>
                <p className={styles.copyright}>© 2026 All rights reserved.</p>
            </div>


            <div className={styles.footerColumn}>
                <h4>Navigation</h4>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/news">News</a></li>
                    <li><a href="/Sessions">Sessions</a></li>
                </ul>
            </div>

            <div className={styles.footerColumn}>
                <h4>Contacts</h4>
                <p>Email: support@cinema.ua</p>
                <p>Tel: +380 99 999 99 99</p>
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