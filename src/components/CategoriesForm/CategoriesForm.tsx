import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {createCategory, editCategoryFetch, getCategory} from '../../store/category/categoryThunks';
import {CategoryType, EditCategoryType} from '../../types';
import {clearCurrentEditCategory, closeModal, selectCurrentEditCategory} from '../../store/category/categorySlice';


const CategoriesForm = () => {
  const [category, setCategory] = useState<CategoryType>({
    type: 'income',
    name: ''
  });
  const [id, setId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const editCategory = useAppSelector(selectCurrentEditCategory);

  useEffect(() => {
    if (editCategory) {
      setCategory({
        type: editCategory.type,
        name: editCategory.name
      });
      setId(editCategory.id);
      dispatch(clearCurrentEditCategory());
    }
  }, [editCategory]);

  const handleCancel = () => {
    dispatch(closeModal());
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setCategory(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (id) {
      const data: EditCategoryType = {
        id: id,
        category: category,
      };
      await dispatch(editCategoryFetch(data));
    } else {
      await dispatch(createCategory(category));
    }
    dispatch(getCategory());
    dispatch(closeModal());
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="type" className="form-label">Type:</label>
        <select
          onChange={onChange}
          defaultValue={category.type}
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
        <label htmlFor="name" className="form-label">Name:</label>
        <input
          onChange={onChange}
          value={category.name}
          id="name"
          name="name"
          type="text"
          className="form-control"
          required
        />
      </div>
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-outline-success">Add</button>
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

export default CategoriesForm;