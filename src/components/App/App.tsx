import css from './App.module.css';
import {useState} from 'react';
import toast, {Toaster} from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { fetchMovies } from '../../services/movieService';
import type { Movie} from '../../types/movie';
import type {FetchMoviesResponse} from '../../services/movieService'

import ReactPaginate from 'react-paginate';
import { useQuery } from '@tanstack/react-query';




export default function App() {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const {data, isLoading, isError} = useQuery<FetchMoviesResponse>({
        queryKey: ['movies', query, page],
        queryFn: () => fetchMovies(query, page), 
        enabled: query !== '',
        placeholderData: (previousData) => previousData,
    });

    const movies = data?.results ?? [];
    const totalPages = data?.total_pages ?? 0;

    const handleSearch = (newQuery: string) => {
      setQuery(newQuery);
      setPage(1);
    };

   if (query && !isLoading && movies.length === 0){
    toast.error('No movies found for your request.');
   } 

   return (
    <div className={css.app}>
        <Toaster position ="top-right"/>
        <SearchBar onSubmit={handleSearch}/>

        {isLoading && <Loader/>}
        {isError && <ErrorMessage/>}

        {!isLoading && !isError && movies.length > 0 && (
            <>
            <MovieGrid movies={movies} onSelect={setSelectedMovie}/>
            {totalPages > 1 && (
                <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => setPage(selected + 1)}
                forcePage={page - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
                nextLabel="→"
                previousLabel="←"
            />
          )}
          </>
        )}
        {selectedMovie && (<MovieModal movie={selectedMovie} onClose={()=> setSelectedMovie(null)}/>)}
    </div>
   );
} 