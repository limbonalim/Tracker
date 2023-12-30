import {configureStore} from '@reduxjs/toolkit';
import {categoryReducers} from '../store/category/categorySlice';

export const store = configureStore({
    reducer: {
      category: categoryReducers,
    }
  }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;