import './infrastructure/api/init.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './infrastructure/store/store.js';
import RegisterForm from './features/auth/components/RegisterForm.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import LoginForm from './features/auth/components/LoginForm.jsx';
import { useGetCurrentUserQuery } from './infrastructure/api/redux/apiSlice.js';

const Home = lazy(() => import('./pages/home/Home.jsx'));
const Dictionary = lazy(() => import('./pages/dictionary/Dictionary.jsx'));
const Recommend = lazy(() => import('./pages/recommend/Recommend.jsx'));
const Training = lazy(() => import('./pages/training/Training.jsx'));

const App = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (data?.currentUser) {
      navigate('/dictionary');
    }
    if (error) {
      console.error('Error fetching current user:', error);
    }
  }, [data, error, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data</div>;
  }

  // const isAuthenticated = !!data?.currentUser;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<MainLayout />}>
              {/* <Route path="/" element={isAuthenticated ? <Dictionary /> : <Home />} /> */}
              <Route path="/" element={<Home />} />
              <Route path="/dictionary" element={<Dictionary />} />
              <Route path="/recommend" element={<Recommend />} />
              <Route path="/training" element={<Training />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<LoginForm />} />
            </Route>
          </Routes>
        </Suspense>
      </PersistGate>
    </Provider>
  );
};

export default App;
