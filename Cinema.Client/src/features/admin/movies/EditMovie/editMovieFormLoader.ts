import type { LoaderFunctionArgs } from "react-router";
import { getMovie } from "../../../../api/movieApi";

const editMovieFormLoader = async ({ params }:LoaderFunctionArgs) => {
    if (!params.movieId) {
        throw new Error("Movie ID is required");
    }

    const data = await getMovie(params.movieId);
    
    return data;
};

export default editMovieFormLoader;