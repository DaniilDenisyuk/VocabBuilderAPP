import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

const MainLayout = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MainLayout;
