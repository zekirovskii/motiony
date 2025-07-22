// src/components/SearchInput/SearchInput.jsx
import { useState, useEffect, useRef } from 'react';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import css from './SearchInput.module.css';
import useDebounce from '../../hooks/useDebounce';
import { fetchTrending, searchItem } from '../../services/tmdbApi';
import { useSearch } from '../../context/SearchContext';

export default function SearchInput() {
  const { showDropdown, openDrop, closeDrop } = useSearch();
  const dropdownRef = useRef();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const [items, setItems] = useState([]);

  // dış tıklamada kapat
  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDrop();
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [closeDrop]);

  useEffect(() => {
    if (!showDropdown) return;

    const term = debouncedQuery.trim();

    if (term.length < 3) {
      fetchTrending()
        .then(setItems)
        .catch(console.error);
      return; 
    }
    searchItem(term)
      .then(setItems)
      .catch(console.error);
  }, [debouncedQuery, showDropdown]);


  return (
    <div className={css.searchDiv} ref={dropdownRef}>
      <button className={css.searchIcon} onClick={openDrop}>
        <FaSearch />
      </button>
      <input
        type="text"
        className={css.inputSearch}
        placeholder="Search for a movie, TV show or person..."
        value={query}
        onFocus={openDrop}
        onChange={(e) => setQuery(e.target.value)}
      />

      {showDropdown && (
        <div className={css.dropdown}>
          <div className={css.dropdownContent}>
            <div className={css.trendHeader}>
              <div>
                <FaArrowTrendUp className={css.trendIcon} />
                <span>
                  {debouncedQuery.trim().length <3
                    ? 'Mainstream'
                    : `Results for '${debouncedQuery}'`}
                </span>
              </div>
            </div>
            <ul className={css.trendList}>
              {items.length > 0
                ? items.slice(0, 8).map((item) => (
                    <li key={item.id} className={css.trendItem}>
                      <FaSearch className={css.listIcon} />
                      {item.title || item.name}
                    </li>
                  ))
                : (
                    <li className={css.trendItem}>No results</li>
                  )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
