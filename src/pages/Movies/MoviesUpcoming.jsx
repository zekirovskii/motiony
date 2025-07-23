import { useEffect, useState } from 'react';
import { fetchUpcomingMovies } from '../../services/tmdbApi';
import MovieCard from '../../components/MovieCard/MovieCard';
import css from './MoviesPage.module.css';

export default function MoviesUpcoming() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchUpcomingMovies()
      .then(data => setMovies(data.results))
      .catch(err => console.error('API Hatası:', err));
  }, []);

  return (
    <div className={css.pageContainer}>
      <div className={css.grid}>
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={false}
            onToggleFavorite={() => alert(`${movie.title} → favori`)}
          />
        ))}
      </div>
    </div>
  );
}
