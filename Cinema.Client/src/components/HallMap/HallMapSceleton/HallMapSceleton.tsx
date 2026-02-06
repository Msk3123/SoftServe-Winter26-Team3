import styles from "./HallMapSceleton.module.css";

interface HallMapSceletonProps{
    rows:number;
    seatsPerRow:number;
    className?:string;
}
const HallMapSceleton = ({rows,seatsPerRow,className=""}:HallMapSceletonProps)=>{
    return (
    <div className={styles.wrapper}>
        <div className={`${styles.container} ${className}`}>
            <div className={styles.rowDiff}>
                <div className={`${styles.cell} ${styles.rowNumber}`}></div>
                
                    {Array.from({length:seatsPerRow}).map((_,i)=>(
                        <div
                            className={`${styles.cell} ${styles.colNumber}`}
                            key={`col-humber-1-${i}`}>
                                { i + 1}
                        </div>
                        ))}
                
                <div className={`${styles.cell} ${styles.rowNumber}`}></div>
            </div>

            {Array.from({length:rows}).map((_,i)=>(
                <div key={`row ${i}`} className={styles.row}>
                    <div className={`${styles.cell} ${styles.rowNumber}`} key={`row-humber-1-${i}`}>{ i + 1}</div>
                    
                    {Array.from({length:seatsPerRow}).map((_,j)=> (
                        <div
                            className={`${styles.cell} ${styles.seat}`} 
                            key={`row ${i} seat ${j}`} >
                        </div>
                    ))}

                    <div className={`${styles.cell} ${styles.rowNumber}`} key={`row-humber-2-${i}`}>{ i + 1}</div>
                </div>
            ))}
            
            <div className={styles.rowDiff}>
                <div className={`${styles.cell} ${styles.rowNumber}`}></div>
                    
                {Array.from({length:seatsPerRow}).map((_,i)=>(
                    <div
                        className={`${styles.cell} ${styles.colNumber}`} 
                        key={`col-humber-2-${i}`}
                    >
                        { i + 1}

                    </div>))}
                
                <div className={`${styles.cell} ${styles.rowNumber}`}></div>
            </div>
        </div>
    </div>
    )
}

export default HallMapSceleton;