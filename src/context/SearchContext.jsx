import { createContext, useContext, useState } from 'react';
const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const openDrop = () => setShowDropdown(true);
  const closeDrop = () => setShowDropdown(false);
  const toggleDrop = () => setShowDropdown(prev => !prev);

  return (
    <SearchContext.Provider value={{ showDropdown, openDrop, closeDrop, toggleDrop }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
