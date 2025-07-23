import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../pages/Home';

import MoviesPopular from '../pages/Movies/MoviesPopular';
import MoviesUpcoming from '../pages/Movies/MoviesUpcoming';
import MoviesTopRated from '../pages/Movies/MoviesTopRated';

import TvPopular from '../pages/Tv/TvPopular';
import TvTopRated from '../pages/Tv/TvTopRated';
import TvOnTheAir from '../pages/Tv/TvOnTheAir';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
              <Route path="/movies/popular" element={<MoviesPopular />} />
              <Route path="/movies/upcoming" element={<MoviesUpcoming />} />
              <Route path="/movies/top_rated" element={<MoviesTopRated />} />
              <Route path="/tvshows/popular" element={<TvPopular />} />
              <Route path="/tvshows/top_rated" element={<TvTopRated />} />
              <Route path="/tvshows/on_the_air" element={<TvOnTheAir />} />
      </Route>
    </Routes>
  );
}
