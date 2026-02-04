import { useRef, type Ref, type RefObject } from "react";
import type { SeatShort } from "../../../types/seat.types";
import styles from "./Seat.module.css";

interface SeatProps{
    seat: SeatShort;
    onClick: (item:SeatShort, ref:RefObject<HTMLDivElement | null>) => void;
}
const Seat = ({seat,onClick}:SeatProps)=>{
    const seatRef = useRef<HTMLDivElement>(null);
    return (
        <div
            className={styles.seat}
            ref={seatRef}
            onClick={()=>onClick(seat,seatRef)}
        ></div>
    )
}

export default Seat;