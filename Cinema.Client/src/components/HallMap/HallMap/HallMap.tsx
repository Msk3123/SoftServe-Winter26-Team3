import styles from "./HallMap.module.css";

interface HallMapProps{
    fetch
    onSeatClick:()=>void;
    on
}
const HallMap = ({rows,seatsPerRow,className=""}:HallMapProps)=>{
    return (
        <div className={`${styles.container} ${className}`}>
            {Array.from({length:rows}).map((_,i)=>(
                <div key={`row ${i}`} className={styles.row}>
                    {Array.from({length:seatsPerRow}).map((_,j)=> (
                        <div className={styles.seat} key={`row ${i} seat ${j}`} onHover></div>
                    ))}
                </div>
            )
            )}
        </div>
    )
}

export default HallMap;