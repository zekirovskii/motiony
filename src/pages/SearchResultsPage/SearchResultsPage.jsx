
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchItem } from '../../services/tmdbApi';
import css from './SearchResultsPage.module.css';

export default function SearchResultsPage() {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    searchItem(query)
      .then(data => {
        if (data.length === 0) {
          setError(`No movies were found matching your query.`);
        }
        setResults(data);
      })
      .catch(() => setError('Something went wrong.'))
      .finally(() => setLoading(false));
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className={css.error}>{error}</p>;

  return (
    <div className={css.resultsPage}>
      <h2>Results for "{query}"</h2>
      <div className={css.resultsGrid}>
        {results.map(item => (
          <div
            key={item.id}
            className={css.resultCard}
            onClick={() => window.location.href = `/${item.media_type}/detail/${item.id}`}
          >
            <img
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                  : '/placeholder-poster.jpg'
              }
              alt={item.title || item.name}
            />
            <div className={css.cardInfo}>
              <h3>{item.title || item.name}</h3>
              <span>{(item.release_date || item.first_air_date || '').slice(0, 4)}</span>
              <p>{item.overview || 'No description available.'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
