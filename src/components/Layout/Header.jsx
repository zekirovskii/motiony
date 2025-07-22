import { Link } from "react-router-dom";
import css from "./Header.module.css";
import { FaSearch } from "react-icons/fa";
import { useSearch } from '../../context/SearchContext';

export default function Header() {

const { showDropdown , openDrop } = useSearch();

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
          <Link to="/movies" className={css.navLink}>
            Movies
          </Link>
          <Link to="/tvshows" className={css.navLink}>
            TV Shows
          </Link>
        </nav>
        <button className={css.searchIcon} onClick={openDrop} >
          <FaSearch/>
        </button>
      </div>
    </header>
  );
}
