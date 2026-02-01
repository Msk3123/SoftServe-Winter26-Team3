import type { MovieShort } from "../../../../types/movie.types";
import styles from "./MovieOption.module.css"

const MovieOption = ({item}:{item:MovieShort})=>{
    return (<div>
        {item.title}
    </div>)
}

export default MovieOption;