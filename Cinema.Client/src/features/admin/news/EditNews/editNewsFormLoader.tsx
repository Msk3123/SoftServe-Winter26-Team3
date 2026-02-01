import type { LoaderFunctionArgs } from "react-router";
import { getNews } from "../../../../api/newsApi";

const editNewsFormLoader = async ({ params }:LoaderFunctionArgs) => {
    if (!params.newsId) {
        throw new Error("News ID is required");
    }

    const data = await getNews(params.newsId);
    
    return data;
};

export default editNewsFormLoader;