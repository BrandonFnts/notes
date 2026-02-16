import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const NavigationHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigation = (event) => {
      const path = event.detail;
      navigate(path);
    };

    window.addEventListener('app:navigate', handleNavigation);

    return () => {
      window.removeEventListener('app:navigate', handleNavigation);
    };
  }, [navigate]);

  return null;
};