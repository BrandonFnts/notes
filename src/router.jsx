import { createBrowserRouter } from 'react-router-dom';
import { Root, Layout } from '@/components';
import { NoteListView } from '@/features/notes';
import { LoginView, RegisterView } from '@/features/auth';
import { ProtectedRoute } from '@/components';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <NoteListView /> },
          { path: "notes", element: <NoteListView /> },
        ],
      },
      {
        path: "auth/login",
        element: <LoginView />,
      },
      {
        path: "auth/register",
        element: <RegisterView />,
      },
    ]
  }
]);