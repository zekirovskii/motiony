import css from './Hero.module.css';
import { FaSearch } from "react-icons/fa";
import { useSearch } from '../../context/SearchContext';

export default function Hero() {

    const { showDropdown, openDrop } = useSearch();

  return (
      <section className={css.hero}>
          <div className={css.searchDiv}>
              <button className={css.searchIcon} onClick={openDrop} >
                        <FaSearch />
              </button>
              <input type="text" placeholder="Search for a movie,tv show or person......" className={css.inputSearch} onFocus={openDrop} />
              {showDropdown && (
          <div className={css.dropdown}>
            <p>Popular Movie 1</p>
            <p>Popular Movie 2</p>
            <p>Popular TV Show 1</p>
          </div>
        )}
          </div>
      <div className={css.heroBack}>
        <h1>Welcome.</h1>
        <p>Millions of movies, TV shows and people to discover. Explore now.</p>
        <div className={css.searchBox}>
          <input type="text"
            placeholder="Search for a movie, tv show, person..."
            className={css.inputHero} 
          />
          <button className={css.buttonHero}>Search</button>
        </div>
          </div>
          
    </section>
  );
}
