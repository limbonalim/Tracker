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
import {TransactionAndCategory} from "../../types";

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
      let items: TransactionAndCategory[] = transactions.map((item) => {
        const index = category.findIndex((category) => category.id === item.category);
        if (index >= 0) {
          return {
            ...item,
            category: category[index],
          };
        }
        return {
          ...item,
          category: {
            id: '',
            type: 'income',
            name: '',
            isDeleting: false,
          },
          id: '',
        };
      });

      let listOfElements: TransactionAndCategory[] = items.filter((element) => {
        if (element.id) {
          return element;
        }
      });

      listOfElements = listOfElements.sort((prev, next) => {
        return prev?.createdAt > next?.createdAt ? 1 : -1
      })

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
      <div className="d-flex gap-2 flex-column-reverse">
        {render}
      </div>
    </>
  );
};

export default Home;