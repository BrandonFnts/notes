import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 flex-grow">
        <Outlet />
      </main>
    </div>
  );
};