import toast from "react-hot-toast";
import type { ApiError } from "../../../../types/api.types";
import { patchSeat } from "../../../../api/seatApi";

export const saveHallMap = async (changes: {id: number; seatTypeId: string | number; }[])=>{
        try{

            for (const change of changes) {
                patchSeat(change.id,{"SeatTypeId":change.seatTypeId})
            }

            toast.success("Hall map successfuly saved");
        }catch(e){
            const err= e as ApiError;
            toast.error(err.message);
        }
    }