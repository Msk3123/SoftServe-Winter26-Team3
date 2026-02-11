import type { SeatType } from "../../../../types/seatType.types";
import styles from "./SeatTypeOption.module.css";

const SeatTypeOption = ({item}:{item:SeatType})=>{
    return (<div className={styles.optionContainer}>
        <span>{item.name}</span>
        <span className={styles.price}>Price: {item.basePrice}</span>
    </div>)
}

export default SeatTypeOption;