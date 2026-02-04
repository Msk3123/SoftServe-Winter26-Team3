import {type ReactNode, type Ref, type RefObject } from "react";
import HallMap from "../../../../components/HallMap/HallMap/HallMap";
import type { SeatShort } from "../../../../types/seat.types";
import useHallMap from "../hooks/useHallMap";
import Error from "../../../../components/Error/Error";

interface HallMapEditProps{
    id: number|string;
    sceleton:ReactNode;
}
const HallMapEdit = ({id,sceleton}:HallMapEditProps)=>{
    const {seats,isLoading,error} = useHallMap(id);

    const handleClick = (seat: SeatShort, ref: RefObject<HTMLDivElement| null>)=>{
        if (ref.current) {
            ref.current.style.backgroundColor = "var(--color-primary)";
        }
    }

    if(error){
        return <Error message={error}/>
    }
    return (
        <div>
            <div>controlElements</div>
            {isLoading
                ? sceleton
                : <HallMap seats={seats} onClick={handleClick}/>
            }
            
        </div>
    )
}

export default HallMapEdit;