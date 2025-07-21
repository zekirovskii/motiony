import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Layout/Header";
import Hero from "./components/Hero/Hero";
import { SearchProvider } from './context/SearchContext';

export default function App() {
  return (
    <SearchProvider>
      <Router>
        <Header />
        <Hero />
      </Router>
    </SearchProvider>
  );
}
