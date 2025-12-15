import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../states/slices/uiSlice';
import authReducer from '../states/slices/authSlice';
import restoReducer from '@/states/slices/restoSlice';
import queryReducer from '@/states/slices/querySlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    resto: restoReducer,
    search: queryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
