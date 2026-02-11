import type { LoaderFunctionArgs } from "react-router";
import { getMovie } from "../../../../api/movieApi";

const editMovieFormLoader = async ({ params }:LoaderFunctionArgs) => {
    if (!params.movieId) {
        throw new Error("Movie ID is required");
    }

    const data = await getMovie(params.movieId);

    return {
        ...data,
        duration: data.duration ? Math.floor(data.duration / 60) : 0
};
};

export default editMovieFormLoader;