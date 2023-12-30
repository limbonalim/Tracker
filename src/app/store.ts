import {configureStore} from '@reduxjs/toolkit';
import {categoryReducers} from '../store/category/categorySlice';
import {transactionReducers} from '../store/transaction/transactionSlice';

export const store = configureStore({
    reducer: {
      category: categoryReducers,
      transaction: transactionReducers,
    }
  }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;