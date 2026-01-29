import type { FetchFunction, FetchParams, } from "../types/api.types";
import type {NewsShort } from "../types/news.types";
import { getPaginatedData, deleteItem, defaultParams } from "./api";


export const getAllNews: FetchFunction<NewsShort> = async (params = defaultParams) => {
    return await getPaginatedData<NewsShort>("news", params);
};

export const getRecentNews: FetchFunction<NewsShort> = async () => {
  const params:FetchParams<NewsShort> = {
    page: 1,
    pageSize: 60,
    sortBy: "publishedDate",
    order: "desc"
  }
  
  return await getPaginatedData<NewsShort>("news", params);
};

export const deleteNews = async (id: number | string) => {
    return deleteItem("News", id);
};