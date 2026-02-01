import type { MovieShort } from "../../../../types/movie.types";
import styles from "./MovieOption.module.css"

const MovieOption = ({item}:{item:MovieShort})=>{
    return (<div className={styles.optionContainer}>
        <img src={item.posterUrl} alt={`${item.title}`} className={styles.image}/>
        <span>{item.title}</span>
        <span className={styles.releaseDate}>{item.releaseDate}</span>
    </div>)
}

export default MovieOption;