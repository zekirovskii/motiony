import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMoviesOrTvByCategory } from '../../services/tmdbApi'; 
import MovieCard from '../../components/MovieCard/MovieCard';
import css from './CategoryPage.module.css';



export default function CategoryPage() {
  const { type, category } = useParams(); 

  const [items, setItems] = useState([]);

  useEffect(() => {
  fetchMoviesOrTvByCategory(type, category).then(data => {
    // console.log('API response:', data); 
    setItems(data?.results || []);
  });
}, [type, category]);

   return (
    <div className={css.container}>
      <h1 className={css.heading}>{type} / {category}</h1>
      <div className={css.grid}>
        {items.map(item => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    </div>
  );
}
