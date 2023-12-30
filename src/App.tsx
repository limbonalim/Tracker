import {Route, Routes, useLocation} from 'react-router-dom';
import {Alert} from "react-bootstrap";
import Layout from './containers/Layout/Layout';
import NotFound from './components/NotFound/NotFound';
import Home from './containers/Home/Home';
import Categories from './containers/Categories/Categories';
import MyModal from './components/MyModal/MyModal';
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {closeAlert, selectIsShowAlert, selectMessageAlert} from "./store/category/categorySlice";
import {
  closeTrAlert,
  selectTransactionIsShowAlert,
  selectTransactionMessageAlert
} from "./store/transaction/transactionSlice";

const App = () => {
  const showCategoryAlert = useAppSelector(selectIsShowAlert);
  const showTransactionAlert = useAppSelector(selectTransactionIsShowAlert);
  const categoryMessage = useAppSelector(selectMessageAlert);
  const transactionMessage = useAppSelector(selectTransactionMessageAlert);
  const {pathname} = useLocation();
  const dispatch = useAppDispatch();

  let alert = (
    <Alert show={showCategoryAlert} variant="danger" onClose={() => dispatch(closeAlert())} dismissible>
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>
        {categoryMessage}
      </p>
    </Alert>
  )

  if (pathname === '/') {
    alert = (
      <Alert show={showTransactionAlert} variant="danger" onClose={() => dispatch(closeTrAlert())} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          {transactionMessage}
        </p>
      </Alert>
    )
  }


  return (
    <>
      {alert}
      <Layout>
        <Routes>
          <Route path="/" element={(<Home/>)}/>
          <Route path="/categories" element={(<Categories/>)}/>
          <Route path="*" element={(<NotFound/>)}/>
        </Routes>
      </Layout>
      <MyModal/>
    </>
  );
};

export default App;
