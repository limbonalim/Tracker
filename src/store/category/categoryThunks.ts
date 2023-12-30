import {createAsyncThunk} from '@reduxjs/toolkit';
import {axiosApi} from '../../axios-Api';
import {ApiCategories, Category, CategoryType, EditCategoryType} from '../../types';


export const getCategory = createAsyncThunk<Category[]>(
  'category/fetchCategory',
  async () => {
    const response = await axiosApi.get<ApiCategories | null>('/tracker/category.json');
    const data = response.data;
    if (response.status !== 200) {
      throw new Error('Try later');
    }
    if (data) {
      const keys = Object.keys(data);
      return keys.map((id) => {
        return {
          ...data[id],
          id,
          isDeleting: false
        };
      });
    }
    return [];
  }
);

export const createCategory = createAsyncThunk<void, CategoryType>(
  'category/fetchCreateCategory',
  async (category) => {
    const response = await axiosApi.post('/tracker/category.json', category);
    if (response.status !== 200) {
      throw new Error('Try later');
    }
  }
);

export const editCategoryFetch = createAsyncThunk<void, EditCategoryType>(
  'category/editCategoryFetch',
  async ({category, id}) => {
    const response = await axiosApi.put(`/tracker/category/${id}.json`, category);
    if (response.status !== 200) {
      throw new Error('Try later');
    }
  }
);

export const deleteCategoryFetch = createAsyncThunk<void, string>(
  'category/deleteCategoryFetch',
  async (id) => {
    const response = await axiosApi.delete(`/tracker/category/${id}.json`);
    if (response.status !== 200) {
      throw new Error('Try later');
    }
  }
);