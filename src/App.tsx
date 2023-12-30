import Layout from './containers/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Home from './containers/Home/Home';
import Categories from './containers/Categories/Categories';
import MyModal from './components/MyModal/MyModal';

const App = () => {


  return (
    <>
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
