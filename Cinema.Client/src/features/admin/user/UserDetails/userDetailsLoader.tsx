import type { LoaderFunctionArgs } from "react-router";
import { getUser } from "../../../../api/userApi";

const userDetailsLoader = async ({ params }:LoaderFunctionArgs) => {
    if (!params.userId) {
        throw new Error("User ID is required");
    }

    const user = await getUser(params.userId);

    return user;
};

export default userDetailsLoader;