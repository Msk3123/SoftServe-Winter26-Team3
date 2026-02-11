import type {FetchPaginatedListFunction, FetchOneFunction, FetchParams, PatchFunction, PostFunction, PutFunction, } from "../types/api.types";
import type {News, NewsCreate, NewsShort } from "../types/news.types";
import { getPaginatedData, deleteItem, defaultParams, getItem, postItem, putItem, patchItem } from "./api";


export const getAllNews: FetchPaginatedListFunction<NewsShort> = async (params = defaultParams) => {
    return await getPaginatedData<NewsShort>("news", params);
};

export const getRecentNews: FetchPaginatedListFunction<NewsShort> = async () => {
  const params:FetchParams<NewsShort> = {
    page: 1,
    pageSize: 60,
    sortBy: "publishedDate",
    order: "desc"
  }
  return await getPaginatedData<NewsShort>("news", params);
};

export const getNews:FetchOneFunction<News> = async (id)=>{
    return await getItem("news",id);
}

export const postNews:PostFunction<NewsCreate,News>= async(data)=>{
    return await postItem("news",data);
}
export const putNews:PutFunction<NewsCreate>= async(id,data)=>{
    return await putItem("news",id,data);
}
export const patchNews:PatchFunction<NewsCreate>= async(id,data)=>{
    return await patchItem("news",id,data);
}

export const deleteNews = async (id: number | string) => {
    return await deleteItem("News", id);
};

