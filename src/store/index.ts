import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import travelHistoryReducer from './slices/travelHistorySlice';
import taskSubmissionReducer from './slices/taskSubmissionSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only auth will be persisted
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    travelHistory: travelHistoryReducer,
    taskSubmission: taskSubmissionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 