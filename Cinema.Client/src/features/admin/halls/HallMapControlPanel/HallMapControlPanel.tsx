import type { SeatTypeWithColor } from "../../../../types/seatType.types";
import useSeatTypes from "../hooks/useSeatTypes";
import styles from "./HallMapControlPanel.module.css"
interface HallMapControlPanelProps{
    setSelectedSeatType: (seatType:SeatTypeWithColor)=>void;
    selectedSeatType: SeatTypeWithColor | null;
}

const HallMapControlPanel = ({selectedSeatType,setSelectedSeatType}:HallMapControlPanelProps)=>{
    const {seatTypes,isLoading,error} = useSeatTypes();

    return (
        <div className={styles.container}>
            <span className={styles.title}>Select seat type:</span>
            {isLoading
            ?   <span>Loading seat types</span>
            :   error
                    ? <span>{error}</span>
                    :seatTypes.map((type)=>(
                        <div
                            key={type.seatType.id}
                            className={`${styles.option} ${selectedSeatType?.seatType.id === type.seatType.id ? styles.selected : ""}`}
                            onClick={() => setSelectedSeatType(type)}
                        >
                            <span className={styles.typeName}>{type.seatType.name}</span>
                            <div className={styles.button} style={{ background: type.color }}></div>
                        </div>
                    ))
            
            }
        </div>
    )
}

export default HallMapControlPanel;