import type { LoaderFunctionArgs } from "react-router";
import { getSession } from "../../../../api/sessionApi";

const editSessionFormLoader = async ({ params }:LoaderFunctionArgs) => {
    if (!params.sessionId) {
        throw new Error("Session ID is required");
    }

    const data = await getSession(params.sessionId);
    
    return data;
};

export default editSessionFormLoader;