import { useEffect, useEffectEvent, useState } from "react";
import type { SeatShort } from "../../../../types/seat.types";
import { getSeatsByHall } from "../../../../api/seatApi";
import transformSeats from "../../../../helpers/transformSeats";
import type { ApiError } from "../../../../types/api.types";

const useHallMap = (id:number|string)=>{
    const [seats,setSeats] = useState<Array<SeatShort[]>>([[]]);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [error,setError] = useState<string>("");

    useEffect(()=>{
        const fetchData = async () => {
            try{
                setIsLoading(true)
                const data = await getSeatsByHall(id);
                const seatsDividedByRow = transformSeats(data);
            
                setSeats(seatsDividedByRow);
            }catch(e){
                const err = e as ApiError;
                setError(err.message);
            }finally{
                setIsLoading(false);
            }
            
        }

        fetchData()

    },[id])

    return {seats,isLoading,error}
}

export default useHallMap;