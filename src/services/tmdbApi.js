import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// console.log(API_KEY);

// Hero --> Background
export const fetchTrending = async () => {
  const response = await axios.get(`${BASE_URL}/trending/all/day`, {
    params: { api_key: API_KEY }
  });
  return response.data.results;
};

// Search
export const searchItem = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
  );
  const data = await res.json();
  return data.results;
};

// Movie
export async function fetchPopularMovies(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=tr-TR&page=${page}`);
  if (!res.ok) throw new Error('Popular verisi alınamadı');
  return await res.json();
}

export async function fetchUpcomingMovies(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=tr-TR&page=${page}`);
  if (!res.ok) throw new Error('Upcoming verisi alınamadı');
  return await res.json();
}

export async function fetchTopRatedMovies(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=tr-TR&page=${page}`);
  if (!res.ok) throw new Error('Top Rated verisi alınamadı');
  return await res.json();
}

// TV
export async function fetchPopularTv(page = 1) {
  const res = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=tr-TR&page=${page}`);
  if (!res.ok) throw new Error('Popular TV verisi alınamadı');
  return await res.json();
}

export async function fetchTopRatedTv(page = 1) {
  const res = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=tr-TR&page=${page}`);
  if (!res.ok) throw new Error('Top Rated TV verisi alınamadı');
  return await res.json();
}

export async function fetchOnTheAirTv(page = 1) {
  const res = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=tr-TR&page=${page}`);
  if (!res.ok) throw new Error('On The Air verisi alınamadı');
  return await res.json();
}