import type { LoaderFunctionArgs } from "react-router";
import { getSeatType } from "../../../../api/seatTypeApi";

const editSeatTypeFormLoader = async ({ params }:LoaderFunctionArgs) => {
    if (!params.seatId) {
        throw new Error("SeatType ID is required");
    }

    const data = await getSeatType(params.seatId);
    
    return data;
};

export default editSeatTypeFormLoader;