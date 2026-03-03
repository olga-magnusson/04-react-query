import axios from 'axios';
import {type Movie} from '../types/movie';

export interface FetchMoviesResponse{
    results: Movie[];
    total_pages: number;
}

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

export const fetchMovies = async( query: string, page: number): Promise<FetchMoviesResponse> => {
    const token = import.meta.env.VITE_TMDB_TOKEN;

    const response = await axios.get<FetchMoviesResponse>(BASE_URL,{
        params: {query, page},
        headers: {Authorization: `Bearer ${token}`,},
    });
    
    return response.data;
}