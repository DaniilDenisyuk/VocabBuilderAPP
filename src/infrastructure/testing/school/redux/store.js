//store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import wordsReducer from '../../../../features/dictionary/redux/wordsSlice';
import categoriesReducer from '../../../../features/category/redux/categoriesSlice';
import filtersReducer from '../../../../features/filter/redux/filtersSlice';
import { apiSlice } from '../../../api/redux/apiSlice';
import authReducer from '../../../../features/auth/redux/authSlice';
//
import schoolReducer from './schoolSlice';
import pupilsReducer from '../components/pupilsList/redux/pupilsSlice';
import teachersReducer from '../components/teachersList/redux/teachersSlice';
import classesReducer from '../components/classesList/redux/classesSlice';
import subjectsReducer from '../components/subjectsList/redux/subjectsSlice';
import teachersClassesReducer from '../features/сlassesTeachers/redux/teachersClassesSlice';
import teachersSubjectsReducer from '../features/teacherSubject/redux/teacherSubjectSlice';
import pupilsClassesReducer from '../features/classesPupils/redux/pupilsClassesSlice';
import teachersClassesSubjectsReducer from '../features/teacherClassSubjectTable/redux/teachersClassesSubjectsSlice';

// https://redux-toolkit.js.org/api/combineSlices
// apiSlice  додати до основного редюсера для обробки запитів API,
// щоб він автоматично управляв своїм станом
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  categories: categoriesReducer,
  words: wordsReducer,
  filters: filtersReducer,
  //редюсери SchoolManagement
  school: schoolReducer,
  pupils: pupilsReducer,
  teachers: teachersReducer,
  classes: classesReducer,
  subjects: subjectsReducer,
  teachersClasses: teachersClassesReducer,
  pupilsClasses: pupilsClassesReducer,
  teachersSubjects: teachersSubjectsReducer,
  teachersClassesSubjects: teachersClassesSubjectsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: import.meta.env.MODE === 'development',
});

const persistor = persistStore(store);

export { store, persistor };
