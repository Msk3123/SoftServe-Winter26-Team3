
import type { Genre } from "../../../types/genre.types";
import styles from "./GenreOption.module.css"

const GenreOption = ({item}:{item:Genre})=>{
    return (
    <div className={styles.optionContainer}>
        {item.name}
    </div>)
}

export default GenreOption;