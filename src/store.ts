import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistedReducer, history } from './slices/rootReducer';
import { routerMiddleware } from "connected-react-router";


const preloadedState = {};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware(history)),
  preloadedState
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
