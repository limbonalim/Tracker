import Modal from 'react-bootstrap/Modal';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {closeModal, selectIsCreateCategory, selectIsShowModal} from '../../store/category/categorySlice';
import CategoriesForm from '../CategoriesForm/CategoriesForm';
import TransactionForm from '../TransactionForm/TransactionForm';

const MyModal = () => {
  const show = useAppSelector(selectIsShowModal);
  const isCreateCategory = useAppSelector(selectIsCreateCategory);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isCreateCategory ? <CategoriesForm/> : <TransactionForm/>}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyModal;