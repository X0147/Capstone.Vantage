import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import SearchResults from '../pages/ResultsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'search', element: <SearchResults /> },
      // Fallback 404 route can be added here
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
