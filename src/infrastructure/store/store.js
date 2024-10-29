//store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import wordsReducer from '../../features/dictionary/redux/wordsSlice';
import categoriesReducer from '../../features/category/redux/categoriesSlice';
import filtersReducer from '../../features/filter/redux/filtersSlice';
import { apiSlice } from '../api/redux/apiSlice';
import authReducer from '../../features/auth/redux/authSlice';

// https://redux-toolkit.js.org/api/combineSlices
// apiSlice  додати до основного редюсера для обробки запитів API,
// щоб він автоматично управляв своїм станом
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  categories: categoriesReducer,
  words: wordsReducer,
  filters: filtersReducer,
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
