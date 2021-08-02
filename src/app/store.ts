import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/AuthSlice';
import accountReducer from 'features/accountInfo/AccountSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
