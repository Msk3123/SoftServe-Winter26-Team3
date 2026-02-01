import type { ActorShort } from "../../../../types/actor.types";
import styles from "./ActorOption.module.css"

const ActorOption = ({item}:{item:ActorShort})=>{
    return (
    <div className={styles.optionContainer}>
        <img src={item.photoUrl} alt={`${item.firstName} ${item.lastName}`} className={styles.image}/>
        <span> {item.firstName} {item.lastName}</span>
    </div>)
}

export default ActorOption;