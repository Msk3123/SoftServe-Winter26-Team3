import type { LoaderFunctionArgs } from "react-router";
import { getAllSeatTypes, getSeatTypeUsage } from "../../../../api/seatTypeApi";

const deleteSeatTypeLoader = async ({ params }:LoaderFunctionArgs) => {
    
    if (!params.seatId) {
        throw new Error("Seat type ID is required");
    }

    const usage = await getSeatTypeUsage(params.seatId);
    const seatTypes = await getAllSeatTypes();
    const res = {
        usage:usage.count,
        seatTypes
    };
    console.log(res)

    return res
};

export default deleteSeatTypeLoader;