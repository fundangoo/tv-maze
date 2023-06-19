import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Details from './pages/Details';
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from './components/Fallback';
import { Suspense } from 'react';
import Status from './components/Status';
import ShowSearch from './components/show/ShowSearch';

const Layout: React.FC = (): JSX.Element => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      <header className="flex justify-center sticky p-3 flex-shrink-0 top-0">
        <ShowSearch />
      </header>
      <main className="flex-auto flex-shrink-0 px-10 pb-10 items-start">
        <ErrorBoundary FallbackComponent={Fallback} key={pathname}>
          <Suspense fallback={<Status status="LOADING" />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/details/:id" element={<Details />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      {!isHome && (
        <footer className="flex justify-center fixed p-3 flex-shrink-0 bottom-0 bg-white w-full">
          <Link to="/">Home</Link>
        </footer>
      )}
    </>
  );
};

export default Layout;
