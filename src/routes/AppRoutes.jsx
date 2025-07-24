import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../pages/Home';

import CategoryPage from '../pages/CategoryPage/CategoryPage';
import DetailPage from '../pages/DetailPage/DetailPage';


export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/:type/category/:category" element={<CategoryPage />} />
        <Route path="/:type/detail/:id" element={<DetailPage />} />
      </Route>
    </Routes>
  );
}
