import { useEffect,useState } from "react";
import type { ApiError } from "../../../../types/api.types";
import type { SeatType, SeatTypeWithColor } from "../../../../types/seatType.types";
import { getAllSeatType } from "../../../../api/seatTypeApi";
import { getSeatColor } from "../helpers/getSeatColor";

const useSeatTypes = ()=>{
    const [seatTypes,setSeatTypes] = useState<SeatTypeWithColor[]>([]);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [error,setError] = useState<string>("");

    useEffect(()=>{
        const fetchData = async () => {
            try{
                setIsLoading(true)
                const data = await getAllSeatType()

                const typesWithColors = data.items.map((seatType:SeatType)=> {return  {seatType:seatType , color:getSeatColor(seatType.name)}})
            
                setSeatTypes(typesWithColors);
            }catch(e){
                const err = e as ApiError;
                setError(err.message);
            }finally{
                setIsLoading(false);
            }
            
        }

        fetchData()

    },[])

    return {seatTypes,isLoading,error}
}

export default useSeatTypes;