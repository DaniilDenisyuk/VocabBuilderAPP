import './infrastructure/api/init.js';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/store.js';
import SchoolManagement from './infrastructure/school/pages/homePage/index.jsx';
import TabsPages from './infrastructure/school/pages/tabsPages/index.jsx';
import ClassPage from './infrastructure/school/pages/classPage/index.jsx';
import TeacherPage from './infrastructure/school/pages/teacherPage/index.jsx';
import MainLayout from './infrastructure/layout/MainLayout.jsx';

const Home = lazy(() => import('./infrastructure/school/pages/homePage/index.jsx'));

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/school" element={<SchoolManagement />} />
              <Route path="/tabsPages" element={<TabsPages />} />
              <Route path="/class/:classId" element={<ClassPage />} />
              <Route path="/teacher/:teacherId" element={<TeacherPage />} />
              <Route path="*" element={<div>Page not found</div>} />
            </Route>
          </Routes>
        </Suspense>
      </PersistGate>
    </Provider>
  );
};

export default App;
