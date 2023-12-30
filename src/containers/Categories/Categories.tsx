import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCategory, showCategoryModal} from '../../store/category/categorySlice';
import {getCategory} from '../../store/category/categoryThunks';
import Category from '../../components/Category/Category';

const Categories = () => {
  const categories = useAppSelector(selectCategory);
  const dispatch = useAppDispatch();
  const [render, setRender] = useState<React.JSX.Element[] | null>(null);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setRender(categories.map((category) => (
        <Category
          key={category.id}
          id={category.id}
          type={category.type}
          name={category.name}
          isDeleting={category.isDeleting}
        />
      )));
    }
  }, [categories]);

  const handleCreate = () => {
    dispatch(showCategoryModal());
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Category</h2>
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

export default Categories;