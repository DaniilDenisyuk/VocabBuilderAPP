//store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import userReducer from '../../features/auth/redux/authSlice';
import wordsReducer from '../../features/dictionary/redux/wordsSlice';
import categoriesReducer from '../../features/category/redux/categoriesSlice';
import filtersReducer from '../../features/filter/redux/filtersSlice';

const rootReducer = combineReducers({
  auth: userReducer,
  categories: categoriesReducer,
  //додавання, редагування, видалення, вивчення слів
  words: wordsReducer,
  filters: filtersReducer,
  //стан тренувань користувача(прогрес і результати)
  // trainaing: trainingReducer,
  //відображення повідомлень про помилки, успішні операції, ...
  // notifications: notificationsReducer,
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
    }),
  devTools: import.meta.env.MODE === 'development',
});

const persistor = persistStore(store);

export { store, persistor };
