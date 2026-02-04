import type {RefObject } from "react";
import type { SeatShort } from "../../../types/seat.types";
import Seat from "../Seat/Seat";
import styles from "./HallMap.module.css";

interface HallMapProps{
    seats:Array<SeatShort[]>;
    onClick: (item:SeatShort, ref:RefObject<HTMLDivElement | null>)=>void;
}
const HallMap = ({seats,onClick}:HallMapProps)=>{
    return (
        <div className={styles.container}>
            {/* cols numbers */}
            <div className={styles.rowDiff}>
                <div className={styles.rowNumber}></div>
                {Array.from({length:seats[0].length}).map((_,i)=><div className={styles.colNumber}>{ i+ 1}</div>)}
                <div className={styles.rowNumber}></div>
            </div>

            {seats.map((row,i)=>(
                <div key={`row ${i}`} className={styles.row}>
                    <div className={styles.rowNumber}>{ i+ 1}</div>
                    {row.map((seat)=> <Seat key={seat.id} seat={seat} onClick={onClick}/> )}
                    <div className={styles.rowNumber}>{ i+ 1}</div>
                </div>
            ))}

            <div className={styles.rowDiff}>
                <div className={styles.colNumber}></div>
                {Array.from({length:seats[0].length}).map((_,i)=><div className={styles.colNumber}>{ i+ 1}</div>)}
                <div className={styles.colNumber}></div>
            </div>

        </div>
    )
}

export default HallMap;