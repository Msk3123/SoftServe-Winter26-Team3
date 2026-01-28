import type { MovieApiResponse } from '../types';

const BASE_URL = "http://localhost:5199/api/Movie";

export const getMovies = async (type: 'now' | 'soon'): Promise<MovieApiResponse> => {
  const endpoint = type === 'now' 
    ? `${BASE_URL}/now-showing` 
    : `${BASE_URL}/upcoming`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
};