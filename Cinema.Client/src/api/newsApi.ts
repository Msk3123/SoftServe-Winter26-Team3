import type {FetchListFunction, FetchParams, } from "../types/api.types";
import type {NewsShort } from "../types/news.types";
import { getPaginatedData, deleteItem, defaultParams } from "./api";


export const getAllNews: FetchListFunction<NewsShort> = async (params = defaultParams) => {
    return await getPaginatedData<NewsShort>("news", params);
};

export const getRecentNews: FetchListFunction<NewsShort> = async () => {
  const params:FetchParams<NewsShort> = {
    page: 1,
    pageSize: 60,
    sortBy: "publishedDate",
    order: "desc"
  }
  return await getPaginatedData<NewsShort>("news", params);
};

export const deleteNews = async (id: number | string) => {
    return await deleteItem("News", id);
};