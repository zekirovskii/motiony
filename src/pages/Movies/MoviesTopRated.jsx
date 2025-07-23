import { useEffect, useState } from 'react';
import { fetchTopRatedMovies } from '../../services/tmdbApi';
import MovieCard from '../../components/MovieCard/MovieCard';
import css from './MoviesPage.module.css';

export default function MoviesTopRated() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTopRatedMovies()
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
