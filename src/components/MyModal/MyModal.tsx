import Modal from 'react-bootstrap/Modal';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {closeModal, selectIsCreateCategory, selectIsShowModal} from '../../store/category/categorySlice';
import CategoriesForm from '../CategoriesForm/CategoriesForm';
import TransactionForm from '../TransactionForm/TransactionForm';
import {closeTransactionModal, selectIsShowTransactionModal} from '../../store/transaction/transactionSlice';

const MyModal = () => {
  const show = useAppSelector(selectIsShowModal);
  const transactionShow = useAppSelector(selectIsShowTransactionModal);
  const isCreateCategory = useAppSelector(selectIsCreateCategory);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeModal());
    dispatch(closeTransactionModal());
  };

  return (
    <>
      <Modal show={show || transactionShow} onHide={handleClose}>
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