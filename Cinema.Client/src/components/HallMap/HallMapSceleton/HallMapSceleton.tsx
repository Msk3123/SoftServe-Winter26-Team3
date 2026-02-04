import styles from "./HallMapSceleton.module.css";

interface HallMapSceletonProps{
    rows:number;
    seatsPerRow:number;
    className?:string;
}
const HallMapSceleton = ({rows,seatsPerRow,className=""}:HallMapSceletonProps)=>{
    return (
        <div className={`${styles.container} ${className}`}>
            {Array.from({length:rows}).map((_,i)=>(
                <div key={`row ${i}`} className={styles.row}>
                    {Array.from({length:seatsPerRow}).map((_,j)=> (
                        <div className={styles.seat} key={`row ${i} seat ${j}`} ></div>
                    ))}
                </div>
            )
            )}
        </div>
    )
}

export default HallMapSceleton;