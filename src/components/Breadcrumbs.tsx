import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Do not show breadcrumbs on the home page or search page
  if (pathnames.length === 0 ?? location.pathname === '/') {
    return null;
  }

  const formatBreadcrumb = (str: string) => {
    return str
      .replace(/-/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-lg py-sm">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-xs font-mono tracking-wider">
          <li>
            <Link
              to="/"
              className="text-vantage-muted hover:text-vantage-accent transition-colors flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          
          {pathnames.map((value, index) => {
            const isLast = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;

            return (
              <li key={to} className="flex items-center space-x-2">
                <ChevronRight className="w-3.5 h-3.5 text-white/20" />
                {isLast ? (
                  <span className="text-vantage-accent font-bold" aria-current="page">
                    {formatBreadcrumb(value)}
                  </span>
                ) : (
                  <Link
                    to={to}
                    className="text-vantage-muted hover:text-white transition-colors"
                  >
                    {formatBreadcrumb(value)}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
