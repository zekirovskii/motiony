import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchDetailsById, fetchCreditsById } from '../../services/tmdbApi';
import { useFavorites } from '../../context/FavoritesContext';
import StarButton from '../../components/StarButton/StarButton';
import css from './DetailPage.module.css';

import Rating from '../../components/Rating/Rating';

export default function DetailPage() {
  const { type, id } = useParams(); 
  const [item, setItem] = useState(null);
  const [cast, setCast] = useState([]);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
  fetchDetailsById(type, id).then(data => {
   // console.log('DETAIL DATA:', data);
    setItem(data);
  });

  fetchCreditsById(type, id).then(data => {
   // console.log('CREDITS:', data);
    setCast(data.cast.slice(0, 10));
  });
}, [type, id]);

    if (!item) return <p className={css.loading}>Yükleniyor...</p>;
    

  const {
    title,
    name,
    poster_path,
    vote_average,
    overview,
    release_date,
    first_air_date,
    runtime,
    genres,
    original_language,
  } = item;

  const displayTitle = title || name;
  const displayDate = release_date || first_air_date;
  const displayGenres = genres?.map(g => g.name).join(', ');
  const displayRuntime = runtime ? `${runtime} dk` : '—';
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : '/placeholder-500x750.png';

  const score = Math.round(vote_average * 10);

  return (
    <div className={css.container}>
      <img src={posterUrl} alt={displayTitle} className={css.poster} />

      <div className={css.details}>
        <div className={css.header}>
          <h1 className={css.title}>{displayTitle}</h1>
          <StarButton
            isActive={isFavorite(item.id)}
            onClick={() => toggleFavorite(item)}
          />
        </div>

        <div className={css.meta}>
          <Rating value={vote_average} variant="inline" />
          <span> • </span>
          <span>{displayDate}</span>
          <span> • </span>
          <span>{displayRuntime}</span>
          <span> • </span>
          <span>{original_language?.toUpperCase()}</span>
        </div>

        <p className={css.overview}>{overview}</p>

        <div className={css.extra}>
          <p><strong>Türler:</strong> {displayGenres || '—'}</p>
        </div>

        <div className={css.castSection}>
          <h2>Oyuncular</h2>
          <ul className={css.castList}>
            {cast.map(actor => (
              <li key={actor.id}>
                <span>{actor.name}</span>
                <small className={css.character}>({actor.character})</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
