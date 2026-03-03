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



export default function App() {
    const [movies, setMovies] = useState<Movie[]>( []);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const handleSearch = async (query: string) => {
        try {
          setMovies([]);
          setError(false);
          setIsLoading(true);
    
          const data = await fetchMovies(query);
    
          if (data.length === 0) {
            toast.error('No movies found for your request.');
            return;
          }
    
          setMovies(data);
        } catch {
          setError(true);
        } finally {
          setIsLoading(false);
        }
      };

      return (
        <div className={css.app}>
          <Toaster position="top-right" />
    
          <SearchBar onSubmit={handleSearch} />
    
          {isLoading && <Loader />}
    
          {error && <ErrorMessage />}
    
          {!isLoading && !error && movies.length > 0 && (
            <MovieGrid movies={movies} onSelect={setSelectedMovie} />
          )}
    
          {selectedMovie && (
            <MovieModal
              movie={selectedMovie}
              onClose={() => setSelectedMovie(null)}
            />
          )}
        </div>
      );
    }