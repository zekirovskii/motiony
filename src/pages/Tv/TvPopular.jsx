import { useEffect, useState } from 'react';
import { fetchPopularTv } from '../../services/tmdbApi';
import MovieCard from '../../components/MovieCard/MovieCard';
import css from './TvPage.module.css';

export default function TvPopular() {
  const [tv, setTv] = useState([]);

  useEffect(() => {
    fetchPopularTv()
      .then(data => setTv(data.results))
      .catch(err => console.error('API Hatası:', err));
  }, []);

  return (
    <div className={css.pageContainer}>
      <div className={css.grid}>
        {tv.map(show => (
          <MovieCard key={show.id} movie={show} />
        ))}
      </div>
    </div>
  );
}
