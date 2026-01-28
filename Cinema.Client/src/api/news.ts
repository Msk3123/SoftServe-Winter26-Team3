import type { News, NewsApiResponse } from '../types';

const API_URL = "http://localhost:5199/api/News";

export const getNews = async (): Promise<News[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await response.json();
  
  const items = (data as any).items ? (data as any).items : data;
  
  return items as News[];
};