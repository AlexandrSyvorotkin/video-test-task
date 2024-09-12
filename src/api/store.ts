import { configureStore } from '@reduxjs/toolkit';
import { timeStamps } from './timestamps_analytics';

export const store = configureStore({
  reducer: {
    [timeStamps.reducerPath]: timeStamps.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(timeStamps.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;