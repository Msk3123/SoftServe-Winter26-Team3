import { memo, useRef, type RefObject } from "react";
import styles from "./Seat.module.css";

interface SeatProps {
    id: number;
    color: string;
    onClick: (id: number, ref?: RefObject<HTMLDivElement | null>) => void;
    onMouseEnter?: (id: number) => void;
    className?:string;
}

const Seat = memo(({ id, color, onClick, onMouseEnter,className }: SeatProps) => {
    const seatRef = useRef<HTMLDivElement>(null);
    return (
        <div
            className={`${styles.seat} ${className ?? ""}`}
            ref={seatRef}
            onClick={() => onClick(id, seatRef)}
            onMouseEnter={() => onMouseEnter?.(id)}
            style={{ background: color }}
        ></div>
    );
});
export default Seat;
