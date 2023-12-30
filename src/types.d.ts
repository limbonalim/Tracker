export interface ApiCategories {
  [id: string]: CategoryType;
}

export interface CategoryType {
  type: 'income' | 'expense';
  name: string;
}

export interface Category extends CategoryType {
  id: string;
  isDeleting: boolean;
}

export interface EditCategoryType {
  id: string,
  category: CategoryType,
}