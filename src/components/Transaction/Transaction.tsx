import React from 'react';
import dayjs from 'dayjs';
import {useAppDispatch} from '../../app/hooks';
import {setCurrentEdit, setDelete, showTransactionModal} from '../../store/transaction/transactionSlice';
import {deleteTransaction, getTransaction} from '../../store/transaction/transactionThunks';
import {Category} from '../../types';


interface Props {
  id: string;
  date: string;
  amount: number;
  category: Category;
  isDeleting: boolean;
}

const Transaction: React.FC<Props> = ({id, date, amount, category, isDeleting}) => {
  const dispatch = useAppDispatch();
  const value = category.type === 'income' ?
    (
      <span className="text-success">+{amount}</span>
    ) : (
      <span className="text-danger">-{amount}</span>
    );

  const handleDelete = async () => {
    dispatch(setDelete(id));
    await dispatch(deleteTransaction(id));
    dispatch(getTransaction());
  };

  const handleEdit = () => {
    dispatch(setCurrentEdit({
      id,
      isDeleting,
      createdAt: date,
      category: category,
      amount: amount,
      type: category.type
    }));
    dispatch(showTransactionModal());
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-2 border border-secondary">
      <div className="d-flex align-items-center gap-3">
        <span>{dayjs(date).format('DD.MM.YYYY HH:mm:ss')}</span>
        <span>{category.name}</span>
      </div>
      <div className="d-flex align-items-center gap-3">
        {value}
        <div className="d-flex align-items-center gap-2">
          <button
            disabled={isDeleting}
            onClick={handleDelete}
            className="btn btn-outline-danger"
            type="button"
          >Delete
          </button>
          <button
            disabled={isDeleting}
            onClick={handleEdit}
            className="btn btn-outline-primary"
            type="button"
          >Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transaction;