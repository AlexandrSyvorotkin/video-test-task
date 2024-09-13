import { configureStore } from '@reduxjs/toolkit';
import { timeStamps } from '../services/timestamps_analytics';
import videoPlayerReducer from './video-slice'
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
	reducer: {
		[timeStamps.reducerPath]: timeStamps.reducer,
		videoPlayer: videoPlayerReducer,

	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(timeStamps.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;