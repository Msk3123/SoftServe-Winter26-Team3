export interface Movie {
  id: number;
  movieTitle: string;
  posterUrl: string;
}
export interface News {
  id: number;
  title: string;
  shortContent: string;
  imageUrl: string;
  publishedDate: string;
}
export interface MovieApiResponse {
  items: Movie[];
  totalCount: number;
}
export interface NewsApiResponse {
  items: News[];
  totalCount: number;
}