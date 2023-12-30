import React from 'react';
import {Category} from '../../types';
import {useAppDispatch} from '../../app/hooks';
import {setCurrentEditCategory, setDelete, showCategoryModal} from '../../store/category/categorySlice';
import {deleteCategoryFetch, getCategory} from '../../store/category/categoryThunks';

const Category: React.FC<Category> = ({name, type, id, isDeleting}) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    const answer = confirm('Do you want delete?');
    if (answer) {
      dispatch(setDelete(id));
      await dispatch(deleteCategoryFetch(id));
      dispatch(getCategory());
    }
  };

  const handleEdit = () => {
    dispatch(setCurrentEditCategory({
      id,
      name,
      type,
      isDeleting
    }));
    dispatch(showCategoryModal());
  };

  return (
    <div className="d-flex align-items-center justify-content-between border border-secondary p-2">
      <span>{name}</span>
      <div className="d-flex align-items-center gap-2">
        <span className={type === 'income' ? 'text-success' : 'text-danger'}>{type}</span>
        <div className="d-flex align-items-center gap-2">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn btn-outline-danger"
            type="button"
          >Delete
          </button>
          <button
            onClick={handleEdit}
            disabled={isDeleting}
            className="btn btn-outline-primary"
            type="button"
          >Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;