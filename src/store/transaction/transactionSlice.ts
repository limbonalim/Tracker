import {RootState} from '../../app/store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getTransaction} from './transactionThunks';
import {Category, Transaction, TransactionWhitCategory} from '../../types';


interface TransactionState {
  transaction: Transaction[];
  category: Category[];
  isShowModal: boolean;
  isCreateTransaction: boolean;
  total: number;
}

const initialState: TransactionState = {
  transaction: [],
  category: [],
  isShowModal: false,
  isCreateTransaction: false,
  total: 0
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    showTransactionModal: (state) => {
      state.isShowModal = true;
    },
    closeTransactionModal: (state) => {
      state.isShowModal = false;
    },
    setTotal: (state, {payload: amount}: PayloadAction<number>) => {
      state.total = amount;
    },
    setDelete: (state, {payload: id}: PayloadAction<string>) => {
      const index = state.transaction.findIndex((item) => item.id === id);
      state.transaction[index].isDeleting = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTransaction.pending, (state) => {
      console.log('getTransaction.pending');
    });
    builder.addCase(getTransaction.fulfilled, (state, {payload: data}: PayloadAction<TransactionWhitCategory>) => {
      console.log('getTransaction.fulfilled');
      state.transaction = data.transactions;
      state.category = data.category;
    });
    builder.addCase(getTransaction.rejected, (state) => {
      console.log('getTransaction.rejected');
    });
  }
});

export const selectTransaction = (state: RootState) => state.transaction.transaction;
export const selectIsShowTransactionModal = (state: RootState) => state.transaction.isShowModal;
export const selectCategory = (state: RootState) => state.transaction.category;
export const selectTotal = (state: RootState) => state.transaction.total;


export const {
  showTransactionModal,
  closeTransactionModal,
  setTotal,
  setDelete
} = transactionSlice.actions;
export const transactionReducers = transactionSlice.reducer;