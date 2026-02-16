import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { GhostRedButton } from '../ui/GhostRedButton';

export const Navbar = () => {
  const { logout } = useAuth();
  return (
    <div className="navbar bg-base-100 shadow-md mb-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">My Notes App</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/notes">Notes</Link></li>
        </ul>
        <GhostRedButton onClick={logout}>Logout</GhostRedButton>
      </div>
    </div>
  );
};