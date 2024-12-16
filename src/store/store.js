//store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import schoolReducer from '../infrastructure/school/pages/redux/schoolSlice';
import pupilsReducer from '../infrastructure/school/components/pupilsList/redux/pupilsSlice';
import teachersReducer from '../infrastructure/school/components/teachersList/redux/teachersSlice';
import classesReducer from '../infrastructure/school/components/classesList/redux/classesSlice';
import subjectsReducer from '../infrastructure/school/components/subjectsList/redux/subjectsSlice';

import pupilsClassesReducer from '../infrastructure/school/features/classesPupils/redux/pupilsClassesSlice';
import classesTeachersReducer from '../infrastructure/school/features/сlassesTeachers/redux/classesTeachersSlice';
import classesSubjectsReducer from '../infrastructure/school/features/classesSubject/redux/classesSubjectsSlice';

import teachersSubjectsReducer from '../infrastructure/school/features/teacherSubject/redux/teachersSubjectsSlice.js';
import teachersClassesReducer from '../infrastructure/school/features/teachersClasses/redux/teachersClassesSlice';

import relationsReducer from '../infrastructure/school/features/teacherClassSubjectTable/redux/relations.js';

const rootReducer = combineReducers({
  school: schoolReducer,
  pupils: pupilsReducer,
  teachers: teachersReducer,
  classes: classesReducer,
  subjects: subjectsReducer,
  classesTeachers: classesTeachersReducer,
  pupilsClasses: pupilsClassesReducer,
  teachersClasses: teachersClassesReducer,
  classesSubjects: classesSubjectsReducer,
  teachersSubjects: teachersSubjectsReducer,
  relations: relationsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: import.meta.env.MODE === 'development',
});

const persistor = persistStore(store);

export { store, persistor };
