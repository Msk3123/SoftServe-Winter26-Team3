import type { LoaderFunctionArgs } from "react-router";
import { getActor } from "../../../../api/actorApi";

const editActorFormLoader = async ({ params }:LoaderFunctionArgs) => {
    if (!params.actorId) {
        throw new Error("Actor ID is required");
    }

    const data = await getActor(params.actorId);
    
    return data;
};

export default editActorFormLoader;