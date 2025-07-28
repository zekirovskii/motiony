import { Link } from "react-router-dom";
import css from "./Header.module.css";
import { FaSearch } from "react-icons/fa";
import { useSearch } from '../../context/SearchContext';
import { useLocation } from "react-router-dom";

export default function Header() {

  const { showDropdown, openDrop, toggleSearchInput ,forceOpenDropdown } = useSearch();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleSearchClick = () => {
    if (isHome) {
      // Home'da input zaten açık → sadece dropdown'u aç
      forceOpenDropdown();
    } else {
      // Diğer sayfalarda input'u aç
      toggleSearchInput();
    }
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <div className={css.logo}>
          <a href="/" className={css.logoLink}>
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="TMDB Logo"
              className={css.logoImage}
            />
          </a>
        </div>

        <nav className={css.nav}>
          <div className={css.navItem}>
            <span className={css.navLink}>Movies</span>
            <ul className={css.dropdown}>
              <li><Link to="/movies/category/popular">Popular</Link></li>
              <li><Link to="/movies/category/top_rated">Top Rated</Link></li>
              <li><Link to="/movies/category/upcoming">Upcoming</Link></li>
            </ul>
          </div>
          <div className={css.navItem}>
            <span className={css.navLink}>Tv Shows</span>
            <ul className={css.dropdown}>
              <li><Link to="/tvshows/category/popular">Populer</Link></li>
              <li><Link to="/tvshows/category/top_rated">Top Rated</Link></li>
              <li><Link to="/tvshows/category/on_the_air">On The Air</Link></li>
            </ul>
          </div>
        </nav>
        
        <button className={css.searchIcon} onClick={handleSearchClick}>
          <FaSearch />
        </button>
  
      </div>
    </header>
  );
}
