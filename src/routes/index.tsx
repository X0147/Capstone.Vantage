import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import SearchResults from '../pages/ResultsPage';
import NotFound from '../pages/NotFound';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: 'search', element: <SearchResults /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  {
    basename,
  }
);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
