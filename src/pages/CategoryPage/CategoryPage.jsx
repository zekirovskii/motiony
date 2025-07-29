import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMoviesOrTvByCategory, fetchGenres } from '../../services/tmdbApi';
import MovieCard from '../../components/MovieCard/MovieCard';
import PopoverMenu from '../../components/PopoverMenu/PopoverMenu';
import css from './CategoryPage.module.css';
import { getFormattedTitle } from '../../utils/formatters';

export default function CategoryPage() {
  const { type, category } = useParams();

  const [allItems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [sort, setSort] = useState('popularity.desc');
  const [filters, setFilters] = useState({
    rating: false,
    popularity: false,
    favorites: false,
    startDate: '',
    endDate: ''
  });
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    fetchMoviesOrTvByCategory(type, category).then(data => {
      const results = data?.results || [];
      setAllItems(results);
      setItems(results);
      setVisibleCount(10);
    });

    fetchGenres(type).then(setGenres);
  }, [type, category]);

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, checked, value, type } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGenreChange = (e) => {
    const id = Number(e.target.value);
    setSelectedGenres(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handleSearchSubmit = () => {
    let filtered = [...allItems];

    if (filters.rating) {
      filtered = filtered.filter(item => item.vote_average >= 7);
    }
    if (filters.popularity) {
      filtered = filtered.filter(item => item.popularity >= 100);
    }
    if (filters.favorites) {
      const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
      filtered = filtered.filter(item => favs.some(fav => fav.id === item.id));
    }
    if (filters.startDate) {
      filtered = filtered.filter(item => {
        const date = new Date(item.release_date || item.first_air_date);
        return date >= new Date(filters.startDate);
      });
    }
    if (filters.endDate) {
      filtered = filtered.filter(item => {
        const date = new Date(item.release_date || item.first_air_date);
        return date <= new Date(filters.endDate);
      });
    }
    if (selectedGenres.length > 0) {
      filtered = filtered.filter(item =>
        item.genre_ids?.some(id => selectedGenres.includes(id))
      );
    }

    const getValue = (item, key) => {
      if (key === 'title' || key === 'name') return (item.title || item.name || '').toLowerCase();
      if (key === 'release_date') return new Date(item.release_date || item.first_air_date);
      return item[key] || 0;
    };

    const [field, direction] = sort.split('.');
    filtered.sort((a, b) => {
      const aVal = getValue(a, field);
      const bVal = getValue(b, field);
      if (typeof aVal === 'string') {
        return direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    });

    setItems(filtered);
    setVisibleCount(10);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 10);
  };

  const isFilterApplied =
    Object.values(filters).some(value => !!value) || selectedGenres.length > 0;

  return (
    <div className={css.pageWrapper}>
      <PopoverMenu
        filters={filters}
        sort={sort}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        onSearch={handleSearchSubmit}
        isFilterApplied={isFilterApplied}
        genres={genres}
        selectedGenres={selectedGenres}
        onGenreChange={handleGenreChange}
      />

      <div className={css.contentWrapper}>
        <h1 className={css.heading}>{getFormattedTitle(type, category)}</h1>
        <div className={css.grid}>
          {items.slice(0, visibleCount).map(item => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </div>
        {visibleCount < items.length && (
          <button className={css.loadMore} onClick={handleLoadMore}>Load More</button>
        )}
      </div>
    </div>
  );
}
