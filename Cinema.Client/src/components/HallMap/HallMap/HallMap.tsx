import {Fragment} from "react";
import styles from "./HallMap.module.css";

interface HallMapProps<T> {
    seats: T[][];
    renderSeat: (seat: T) => React.ReactNode;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
}
const HallMap = <T extends { id: number | string }>({ 
    seats,
    renderSeat,
    onMouseDown,
    onMouseUp
}: HallMapProps<T>)=>{
    return (
        <div
            className={styles.container}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
        >
            {/* cols numbers */}
            <div className={styles.rowDiff}>
                <div className={styles.rowNumber}></div>
                
                {Array.from({length:seats[0].length}).map((_,i)=><div className={styles.colNumber}  key={`col-humber-1-${i}`}>{ i + 1}</div>)}
                
                <div className={styles.rowNumber}></div>
            </div>

            {seats.map((row,i)=>(
                <div key={`row ${i}`} className={styles.row}>
                    <div className={styles.rowNumber} key={`row-humber-${i}`}>{ i + 1}</div>
                    
                    {row.map((seat)=> 
                        <Fragment key={seat.id}>
                            {renderSeat(seat)}
                        </Fragment>
                    )}

                    <div className={styles.rowNumber} key={`row-humber-2-${i}`}>{ i + 1}</div>
                </div>
            ))}

            {/* bottom cols numbers */}
            <div className={styles.rowDiff}>
                <div className={styles.colNumber}></div>
                
                {Array.from({length:seats[0].length}).map((_,i)=><div className={styles.colNumber} key={`col-humber-2-${i}`}>{ i+ 1}</div>)}
                
                <div className={styles.colNumber}></div>
            </div>

        </div>
    )
}

export default HallMap;