import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  clearCurrentEdit,
  closeTransactionModal,
  selectCategory,
  selectCurrentEditTransaction
} from '../../store/transaction/transactionSlice';
import {
  createTransaction,
  fetchEditTransaction,
  getTransaction
} from '../../store/transaction/transactionThunks';
import {EditTransactionType, TransactionType} from '../../types';

interface Edit {
  id: string;
  createAt: string;
}


const TransactionForm = () => {
  const [transaction, setTransaction] = useState({
    type: 'income',
    category: '',
    amount: '',
  });
  const categories = useAppSelector(selectCategory);
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState<Edit | null>(null);
  const editTransaction = useAppSelector(selectCurrentEditTransaction);

  const incomeOptions = categories.reduce((acc: React.JSX.Element[], category) => {
    if (category.type === 'income') {
      acc.push(<option key={category.id} value={category.id}>{category.name}</option>);
    }
    return acc;
  }, []);

  const expenseOptions = categories.reduce((acc: React.JSX.Element[], category) => {
    if (category.type === 'expense') {
      acc.push(<option key={category.id} value={category.id}>{category.name}</option>);
    }
    return acc;
  }, []);

  useEffect(() => {
    if (editTransaction) {
      setEdit({
        id: editTransaction.id,
        createAt: editTransaction.createdAt,
      });
      setTransaction({
        type: editTransaction.type,
        category: editTransaction.category.id,
        amount: editTransaction.amount.toString(),
      });
      dispatch(clearCurrentEdit());
    }
  }, []);

  const handleCancel = () => {
    dispatch(closeTransactionModal());
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setTransaction(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (edit) {
      const editData: TransactionType = {
        createdAt: edit.createAt,
        category: transaction.category,
        amount: parseFloat(transaction.amount),
      };
      const data: EditTransactionType = {
        id: edit.id,
        transaction: editData,
      };
      await dispatch(fetchEditTransaction(data));
    } else {
      const data: TransactionType = {
        createdAt: new Date().toISOString(),
        category: transaction.category,
        amount: parseFloat(transaction.amount),
      };
      await dispatch(createTransaction(data));
    }

    dispatch(getTransaction());
    dispatch(closeTransactionModal());
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="type" className="form-label">Type:</label>
        <select
          onChange={onChange}
          defaultValue={transaction.type}
          id="type"
          name="type"
          className="form-select"
          required
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category:</label>
        <select
          onChange={onChange}
          value={transaction.category}
          id="category"
          name="category"
          className="form-select"
          required
        >
          <option value="">Select category</option>
          {transaction.type === 'income' ? incomeOptions : expenseOptions}
        </select>
      </div>
      <label htmlFor="amount" className="form-label">Amount:</label>
      <div className="input-group mb-3">
        <input
          onChange={onChange}
          value={transaction.amount}
          id="amount"
          name="amount"
          type="number"
          className="form-control"
          required
        />
        <span className="input-group-text">KGS</span>
      </div>
      <div className="d-flex gap-2">
        <button
          disabled={!transaction.category}
          type="submit"
          className="btn btn-outline-success"
        >Add
        </button>
        <button
          onClick={handleCancel}
          type="button"
          className="btn btn-outline-secondary"
        >Cancel
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;