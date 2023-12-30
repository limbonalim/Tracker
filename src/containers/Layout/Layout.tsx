import React, {PropsWithChildren} from 'react';
import Toolbar from '../../components/Toolbar/Toolbar';

interface Props extends PropsWithChildren {

}

const Layout: React.FC<Props> = ({children}) => {
  return (
    <>
      <header className="mb-5">
        <Toolbar/>
      </header>
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;