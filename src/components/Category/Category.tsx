import React from 'react';
import {CategoryType} from '../../types';

interface Props extends CategoryType{
  id: string;
}

const Category:React.FC<Props> = ({name, type, id}) => {
  return (
    <div>
      <span>{name}</span>
      <div>
        <span>{type}</span>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-danger" type="button">Delete</button>
          <button className="btn btn-outline-primary" type="button">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default Category;