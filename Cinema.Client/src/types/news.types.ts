import type { ActorShort } from "./actor.types";
import type { MovieShort } from "./movie.types";
import type { Tag } from "./tags.types";


export const GENERAL_TAG_ID = 1;

export interface NewsShort {
  id: number|string;
  title: string;
  shortContent: string;
  imageUrl: string;
  publishedDate: string;
}
export interface NewsCreate{
  title: string;
  newsContent: string;
  imageUrl: string;
  publishedDate: string;
  tagId: number|string;
  isActive: boolean;
  movieId?: number|string;
  actorId?: number|string;
}
export interface News {
  id: number;
  title: string;
  newsContent: string;
  imageUrl: string;
  publishedDate: string;
  isActive: boolean;
  tag?: Tag;
  movie?:MovieShort;
  actor?:ActorShort;
}

export const mapNewsToCreate = (news: News): NewsCreate => {
  return {
    title: news.title,
    newsContent: news.newsContent,
    imageUrl: news.imageUrl,
    publishedDate: news.publishedDate,
    isActive: news.isActive,
    tagId: news.tag?.id ?? GENERAL_TAG_ID,
    ...(news.movie?.id && { movieId: news.movie.id }),
    ...(news.actor?.id && { actorId: news.actor.id }),
  };
};