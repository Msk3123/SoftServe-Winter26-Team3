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
  tagId: number;
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
  tagName: string;
  movieTitle: string | null;
  actorFullName: string | null;
}