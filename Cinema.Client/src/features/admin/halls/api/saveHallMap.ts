import toast from "react-hot-toast";
import { patchSeat } from "../../../../api/seatApi";
import { handleError } from "../../../../helpers/handleError";

export const saveHallMap = async (changes: {id: number; seatTypeId: string | number; }[])=>{
        try{

            for (const change of changes) {
                patchSeat(change.id,{"SeatTypeId":change.seatTypeId})
            }

            toast.success("Hall map successfuly saved");
        }catch(e){
            handleError(e)
        }
    }