import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// console.log(API_KEY);

export const fetchTrending = async () => {
  const response = await axios.get(`${BASE_URL}/trending/all/day`, {
    params: { api_key: API_KEY }
  });
  return response.data.results;
};

export const searchItem = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
  );
  const data = await res.json();
  return data.results;
};