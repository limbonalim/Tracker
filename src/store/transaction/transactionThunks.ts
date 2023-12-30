import {createAsyncThunk} from '@reduxjs/toolkit';
import {axiosApi} from '../../axios-Api';
import {ApiCategories, ApiTransactions, TransactionType, TransactionWhitCategory} from '../../types';

export const getTransaction = createAsyncThunk<TransactionWhitCategory>(
  'transaction/fetchTransaction',
  async () => {
    const responseTransactions = await axiosApi.get<ApiTransactions | null>('/tracker/transaction.json');
    const responseCategory = await axiosApi.get<ApiCategories | null>('/tracker/category.json');
    const dataTransactions = responseTransactions.data;
    const dataCategory = responseCategory.data;
    if (responseTransactions.status !== 200 || responseCategory.status !== 200) {
      throw new Error('Try later');
    }
    let transactions;
    if (dataTransactions) {
      const transactionsKeys = Object.keys(dataTransactions);
      transactions = transactionsKeys.map((id) => {
        return {
          ...dataTransactions[id],
          id,
          isDeleting: false
        };
      });
    }
    let category;
    if (dataCategory) {
      const categoryKeys = Object.keys(dataCategory);
      category = categoryKeys.map((id) => {
        return {
          ...dataCategory[id],
          id,
          isDeleting: false
        };
      });
    }
    return {
      transactions: transactions ? transactions : [],
      category: category ? category : [],
    };
  }
);

export const createTransaction = createAsyncThunk<void, TransactionType>(
  'transaction/createTransaction',
  async (transaction) => {
    const response = await axiosApi.post('/tracker/transaction.json', transaction);
    if (response.status !== 200) {
      throw new Error('Try later');
    }
  }
);

export const deleteTransaction = createAsyncThunk<void, string>(
  'transaction/deleteTransaction',
  async (id) => {
    const response = await axiosApi.delete(`/tracker/transaction/${id}.json`);
    if (response.status !== 200) {
      throw new Error('Try later');
    }
  }
);