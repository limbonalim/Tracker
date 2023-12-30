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

export interface ApiTransactions {
  [id: string]: TransactionType;
}

export interface TransactionType {
  category: string;
  amount: number;
  createdAt: string;
}

export interface Transaction extends TransactionType {
  id: string;
  isDeleting: boolean;
}

export interface TransactionWhitCategory {
  transactions: Transaction[];
  category: Category[];
}
