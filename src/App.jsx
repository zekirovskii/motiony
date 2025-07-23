import { BrowserRouter as Router } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext';
import AppRoutes from './routes/AppRoutes';
import { FavoritesProvider } from './context/FavoritesContext';


export default function App() {

  return (
<FavoritesProvider>
      <SearchProvider>
        <Router>
          <AppRoutes />
        </Router>
      </SearchProvider>
    </FavoritesProvider>
  );
}
