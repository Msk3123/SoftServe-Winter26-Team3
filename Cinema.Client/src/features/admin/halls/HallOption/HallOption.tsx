import type { HallShort } from "../../../../types/hall.types";
import styles from "./HallOption.module.css";

const HallOption = ({item}:{item:HallShort})=>{
    return (<div className={styles.optionContainer}>
        <span>{item.hallName}</span>
        <span className={styles.capacity}>Capasity: {item.capacity}</span>
    </div>)
}

export default HallOption;