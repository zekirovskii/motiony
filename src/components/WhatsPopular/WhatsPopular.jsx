import { useEffect, useState } from "react";
import { fetchWhatsPopular } from "../../services/tmdbApi";
import MovieCard from "../MovieCard/MovieCard";
import css from "../WhatsPopular/WhatsPopular.module.css";

export default function WhatsPopular() {
  const [popular, setPopular] = useState([]);
  const [mediaType, setMediaType] = useState("movie");

  useEffect(() => {
    async function loadPopular() {
      try {
        const data = await fetchWhatsPopular(mediaType);
        setPopular(data);
      } catch (error) {
        console.error("Error fetching popular data:", error);
        setPopular([]);
      }
    }
    loadPopular();
  }, [mediaType]);

  return (
    <section className={css.popularSection}>
      <div className={css.header}>
        <h2>What's Popular</h2>
        <div className={css.tabs}>
          <button
            className={mediaType === "movie" ? css.active : ""}
            onClick={() => setMediaType("movie")}
          >
            Movies
          </button>
          <button
            className={mediaType === "tv" ? css.active : ""}
            onClick={() => setMediaType("tv")}
          >
            TV Shows
          </button>
        </div>
      </div>

      <div className={css.scrollWrapper}>
        <div className={css.scrollContainer}>
          {popular.map((item) => (
            <div className={css.cardWrapper} key={item.id}>
              <MovieCard movie={item} />
            </div>
          ))}
        </div>
        <div className={css.rightFade}></div>
      </div>
    </section>
  );
}
