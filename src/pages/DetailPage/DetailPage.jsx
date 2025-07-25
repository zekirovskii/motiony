import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {fetchDetailsById,fetchCreditsById,fetchVideosById } from "../../services/tmdbApi";
import { useFavorites } from "../../context/FavoritesContext";
import StarButton from "../../components/StarButton/StarButton";
import Rating from "../../components/Rating/Rating";
import css from "./DetailPage.module.css";
import { FaUser } from "react-icons/fa";

export default function DetailPage() {
  const { type, id } = useParams();
  const [item, setItem] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    fetchDetailsById(type, id).then(setItem);

    fetchCreditsById(type, id).then((data) => {
      setCast(data.cast.slice(0, 10));
    });

    fetchVideosById(type, id).then((data) => {
      const trailer = data.results.find(
        (v) => v.site === "YouTube" && v.type === "Trailer"
      );
      if (trailer) setTrailerKey(trailer.key);
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
    tagline,
    backdrop_path
  } = item;

  const displayTitle = title || name;
  const displayDate = release_date || first_air_date;
  const displayGenres = genres?.map((g) => g.name).join(", ");
  const displayRuntime = runtime ? `${runtime} dk` : "—";
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "/placeholder-500x750.png";
  const backdropUrl = backdrop_path
    ? `https://image.tmdb.org/t/p/original${backdrop_path}`
    : null;

  return (
    <>
      
      <div
        className={css.topSection}
        style={
          backdropUrl
            ? {
                backgroundImage: `linear-gradient(to bottom, rgba(13, 37, 63, 0.9), rgba(13, 37, 63, 0.7)), url(${backdropUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }
            : {}
        }
      >
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
              <span>
                <Rating value={vote_average} variant="inline" />
              </span>
              <span> • </span>
              <span>{displayDate}</span>
              {type === "movies" && runtime && (
                <>
                  <span> • </span>
                  <span>{displayRuntime}</span>
                </>
              )}
              <span> • </span>
              <span>{original_language?.toUpperCase()}</span>
            </div>

            <section className={css.summarySection}>
              <h2>Summary</h2>
              <p className={css.overview}>
                {overview?.trim() ||
                  tagline?.trim() ||
                  `${displayTitle} hakkında özet bilgi henüz mevcut değil.`}
              </p>
            </section>

            <div className={css.extra}>
              <p>
                <strong>Genres:</strong> {displayGenres || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      
      <section className={css.castSection}>
        <h2>Top Billed Cast</h2>
        <div className={css.castSliderWrapper}>
          <ul className={css.castSlider}>
            {cast.map((actor) => (
              <li key={actor.id} className={css.castCard}>
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={actor.name}
                    className={css.castImg}
                  />
                ) : (
                  <div className={css.placeholderIcon}>
                    <FaUser size={48} />
                  </div>
                )}
                <div className={css.castInfo}>
                  <strong>{actor.name}</strong>
                  <p>{actor.character}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className={css.rightFade}></div>
        </div>
      </section>

      {trailerKey && (
        <section className={css.trailerSection}>
          <h2>Official Trailer</h2>
          <div className={css.trailerWrapper}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Official Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}
    </>
  );
}
