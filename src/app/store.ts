import { configureStore } from '@reduxjs/toolkit';
import { menuApi } from '../features/menu/menuApi';
import { menuReducer } from '../features/menu/menuSlice';

export const store = configureStore({
  reducer: {
    [menuApi.reducerPath]: menuApi.reducer,
    menuUi: menuReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(menuApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;