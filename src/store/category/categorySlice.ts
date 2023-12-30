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
  isShowAlert: boolean;
  messageAlert: string;
}

const initialState: TrackerState = {
  category: [],
  isShowModal: false,
  isCreateCategory: false,
  currentEditCategory: null,
  isLoading: false,
  isShowAlert: false,
  messageAlert: '',
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
    },
    closeAlert: (state) => {
      state.isShowAlert = false;
      state.messageAlert = '';
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
    builder.addCase(createCategory.rejected, (state, {error}) => {
      state.isShowAlert = true;
      state.messageAlert = error.message ? error.message : '';
    });
    builder.addCase(editCategoryFetch.rejected, (state, {error}) => {
      state.isShowAlert = true;
      state.messageAlert = error.message ? error.message : '';
    });
    builder.addCase(deleteCategoryFetch.rejected, (state, {error}) => {
      state.isShowAlert = true;
      state.messageAlert = error.message ? error.message : '';
    });
  }
});

export const selectCategory = (state: RootState) => state.category.category;
export const selectIsShowModal = (state: RootState) => state.category.isShowModal;
export const selectIsCreateCategory = (state: RootState) => state.category.isCreateCategory;
export const selectCurrentEditCategory = (state: RootState) => state.category.currentEditCategory;
export const selectIsLoading = (state: RootState) => state.category.isLoading;
export const selectIsShowAlert = (state: RootState) => state.category.isShowAlert;
export const selectMessageAlert = (state: RootState) => state.category.messageAlert;


export const {
  showCategoryModal,
  closeModal,
  setCurrentEditCategory,
  clearCurrentEditCategory,
  setDelete,
  closeAlert
} = categorySlice.actions;
export const categoryReducers = categorySlice.reducer;