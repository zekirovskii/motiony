import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <>
      
      <main style={{ minHeight: '80vh' }}>
        <Outlet />
      </main>
      
    </>
  );
}
