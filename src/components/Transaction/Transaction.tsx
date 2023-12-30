import React from 'react';
import {CategoryType} from '../../types';

interface Props {
  date: string;
  amount: number;
  category: CategoryType;
}

const Transaction: React.FC<Props> = ({date, amount, category}) => {
  return (
    <div className="d-flex align-items-center">
      <div className="d-flex align-items-center">
        <span>{date}</span>
        <span>{category.name}</span>
      </div>
      <div>
        <span>{amount}</span>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-danger" type="button">Delete</button>
          <button className="btn btn-outline-primary" type="button">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default Transaction;