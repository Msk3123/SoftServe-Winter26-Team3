import type { LoaderFunctionArgs } from "react-router";
import { getHall } from "../../../../api/hallApi";

const editHallFormLoader = async ({ params }:LoaderFunctionArgs) => {
    if (!params.hallId) {
        throw new Error("Hall ID is required");
    }

    const data = await getHall(params.hallId);
    
    return data;
};

export default editHallFormLoader;