import {useCallback, useMemo, useState, type ReactNode } from "react";
import HallMap from "../../../../components/HallMap/HallMap/HallMap";
import useHallMap from "../hooks/useHallMap";
import Error from "../../../../components/Error/Error";
import type {SeatTypeWithColor } from "../../../../types/seatType.types";
import HallMapControlPanel from "../HallMapControlPanel/HallMapControlPanel";
import Seat from "../../../../components/HallMap/Seat/Seat";
import { getSeatColor } from "../helpers/getSeatColor";
import toast from "react-hot-toast";
import Button from "../../../../components/Button/Button";
import styles from "./HallMapEdit.module.css"

interface HallMapEditProps{
    id: number|string;
    sceleton:ReactNode;
    onSubmit: (changes:{
                id: number,
                seatTypeId: string | number,}[])
                =>Promise<void>;
}

const HallMapEdit = ({id, sceleton,onSubmit}: HallMapEditProps) => {
    const {seats: initialSeats, isLoading, error} = useHallMap(id);
    const [selectedSeatType, setSelectedSeatType] = useState<SeatTypeWithColor| null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [changes, setChanges] = useState<Record<string | number, SeatTypeWithColor>>({});

    const updateSeatInChanges = useCallback((seatId: number) => {
        if (!selectedSeatType) return;
        
        setChanges(prev => ({
            ...prev,
            [seatId]: selectedSeatType
        }));
    }, [selectedSeatType]);

    const handleMouseEnter = useCallback((seatId: number) => {
        if (isDrawing) {
            updateSeatInChanges(seatId);
        }
    }, [isDrawing, updateSeatInChanges]);

    const seatsToRender = useMemo(() => {
    return initialSeats?.map(row =>
        row.map(seat => {
            const change = changes[seat.id];
            if (change) {
                return {
                    ...seat,
                    seatTypeName: change.seatType.name,
                    color: change.color
                };
            }
            return seat;
        })
    );
}, [initialSeats, changes]);

    const handleSave = async () => {
        const dataToSend = Object.entries(changes).map(([id, type]) => ({
            id: Number(id),
            seatTypeId: type.seatType.id
        }));

        if (dataToSend.length === 0) return toast.error("There is no changes");

        await onSubmit(dataToSend);
    };

    if (error) return <Error message={error}/>;

    return (
        <div
            onMouseDown={() => setIsDrawing(true)}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
        >
            <HallMapControlPanel
                selectedSeatType={selectedSeatType}
                setSelectedSeatType={setSelectedSeatType}
            />
            
            <Button   
                action={handleSave} 
                disabled={Object.keys(changes).length === 0} 
                className={styles.saveButton} 
                bgColor={Object.keys(changes).length === 0? "var(--button-disabled)":"var(--color-primary)"}>
                Save hall map
            </Button>

            {isLoading || !seatsToRender
                ? sceleton
                : <HallMap
                    seats={seatsToRender}
                    renderSeat={(seat)=>(
                                <Seat
                                    id={seat.id}
                                    color={changes[seat.id]?.color || getSeatColor(seat.seatTypeName)}
                                    onClick={updateSeatInChanges}
                                    onMouseEnter={handleMouseEnter}
                                />) }
                />
            }
        </div>
    );
};

export default HallMapEdit;