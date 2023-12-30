import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  setTotal,
  selectCategory, selectTotal,
  selectTransaction,
  showTransactionModal, selectIsLoading
} from '../../store/transaction/transactionSlice';
import {getTransaction} from '../../store/transaction/transactionThunks';
import Transaction from '../../components/Transaction/Transaction';
import Loading from '../../components/Loading/Loading';

const Home = () => {
  const transactions = useAppSelector(selectTransaction);
  const category = useAppSelector(selectCategory);
  const dispatch = useAppDispatch();
  const total = useAppSelector(selectTotal);
  const [render, setRender] = useState<(React.JSX.Element | null)[]>([]);
  const loading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getTransaction());
  }, []);

  useEffect(() => {
    if (category.length > 0 && transactions.length > 0) {
      let items = transactions.map((item) => {
        const index = category.findIndex((category) => category.id === item.category);
        if (index >= 0) {
          return {
            ...item,
            category: category[index],
          };
        }
        return null;
      });

      const listOfElements = items.filter((element) => {
        if (element) {
          return element;
        }
      });

      const total = listOfElements.reduce((acc, element) => {
        if (element?.category.type === 'income') {
          return acc + element.amount;
        } else if (element?.category.type === 'expense') {
          return acc - element.amount;
        }
        return acc;
      }, 0);

      dispatch(setTotal(total));

      setRender(listOfElements.map((item) => {
        if (item) {
          return (<Transaction
            key={item?.id}
            id={item?.id}
            date={item?.createdAt}
            amount={item.amount}
            category={item.category}
            isDeleting={item.isDeleting}
          />);
        }
        return null;
      }));
    }
  }, [category, transactions]);

  const handleCreate = () => {
    dispatch(showTransactionModal());
  };

  return loading ? <Loading/> : (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span>Total: {total}</span>
        <button
          onClick={handleCreate}
          className="btn btn-outline-primary"
        >Add
        </button>
      </div>
      <div className="d-flex gap-2 flex-column">
        {render}
      </div>
    </>
  );
};

export default Home;