// src/App.jsx
import { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { SearchProvider, useSearch } from './context/SearchContext';
import AppRoutes from './routes/AppRoutes';
import { FavoritesProvider } from './context/FavoritesContext';
import SearchInput from './components/SearchInput/SearchInput';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

function AppContent() {
  const location = useLocation();
  const { isSearchVisible, showSearchInput, hideSearchInput } = useSearch();

  useEffect(() => {
    if (location.pathname === '/') {
      showSearchInput();   
    } else {
      hideSearchInput();  
    }
  }, [location.pathname]);

  return (
    <>
      <Header />
      {isSearchVisible && <SearchInput />}
      <AppRoutes />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <SearchProvider>
        <Router>
          <AppContent />
        </Router>
      </SearchProvider>
    </FavoritesProvider>
  );
}
