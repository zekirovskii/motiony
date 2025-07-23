import { useEffect, useState } from 'react';
import { fetchOnTheAirTv } from '../../services/tmdbApi';
import MovieCard from '../../components/MovieCard/MovieCard';
import css from './TvPage.module.css';

export default function TvOnTheAir() {
  const [tv, setTv] = useState([]);

  useEffect(() => {
    fetchOnTheAirTv()
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
