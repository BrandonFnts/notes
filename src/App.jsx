import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import { router } from './router';

function App() {
  return (
    <AuthProvider>
      <ReactiveProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ReactiveProvider>
    </AuthProvider>
  )
}

export default App

const ReactiveProvider = ({ children }) => {
  return <>{children}</>;
};
