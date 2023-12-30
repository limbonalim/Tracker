import {RootState} from '../../app/store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createCategory, deleteCategoryFetch, editCategoryFetch, getCategory} from './categoryThunks';
import {Category} from '../../types';


interface TrackerState {
  category: Category[];
  isShowModal: boolean;
  isCreateCategory: boolean;
  currentEditCategory: Category | null;
  isLoading: boolean;
}

const initialState: TrackerState = {
  category: [],
  isShowModal: false,
  isCreateCategory: false,
  currentEditCategory: null,
  isLoading: false
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    showCategoryModal: (state) => {
      state.isShowModal = true;
      state.isCreateCategory = true;
    },
    closeModal: (state) => {
      state.isShowModal = false;
      state.isCreateCategory = false;
    },
    setCurrentEditCategory: (state, {payload: item}: PayloadAction<Category>) => {
      state.currentEditCategory = item;
    },
    clearCurrentEditCategory: (state) => {
      state.currentEditCategory = null;
    },
    setDelete: (state, {payload: id}: PayloadAction<string>) => {
      const index = state.category.findIndex((item) => item.id === id);
      state.category[index].isDeleting = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCategory.pending, (state) => {
      state.isLoading = true;
      state.category = [];
    });
    builder.addCase(getCategory.fulfilled, (state, {payload: categories}: PayloadAction<Category[]>) => {
      state.category = categories;
      state.isLoading = false;
    });
    builder.addCase(getCategory.rejected, (state) => {
      console.log('[getCategory.rejected]');
      state.isLoading = false;
    });
    builder.addCase(createCategory.rejected, (state) => {
      console.log('TODO');
    });
    builder.addCase(editCategoryFetch.rejected, (state) => {
      console.log('TODO');
    });
    builder.addCase(deleteCategoryFetch.rejected, (state) => {
      console.log('TODO');
    });
  }
});

export const selectCategory = (state: RootState) => state.category.category;
export const selectIsShowModal = (state: RootState) => state.category.isShowModal;
export const selectIsCreateCategory = (state: RootState) => state.category.isCreateCategory;
export const selectCurrentEditCategory = (state: RootState) => state.category.currentEditCategory;
export const selectIsLoading = (state: RootState) => state.category.isLoading;


export const {
  showCategoryModal,
  closeModal,
  setCurrentEditCategory,
  clearCurrentEditCategory,
  setDelete
} = categorySlice.actions;
export const categoryReducers = categorySlice.reducer;