import { createContext, useContext, useState } from 'react';
const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const openDrop = () => setShowDropdown(true);
  const closeDrop = () => setShowDropdown(false);
  const toggleDrop = () => setShowDropdown(prev => !prev);

  const showSearchInput = () => setIsSearchVisible(true);
  const hideSearchInput = () => setIsSearchVisible(false);
  const toggleSearchInput = () => setIsSearchVisible(prev => !prev);

  const forceOpenDropdown = () => setShowDropdown(true);

  return (
    <SearchContext.Provider value={{ showDropdown, openDrop, closeDrop, toggleDrop, isSearchVisible,
        showSearchInput,
        hideSearchInput,
        toggleSearchInput , forceOpenDropdown}}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
