import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Main from './pages/main';
import store from './redux/store';
import { Provider } from 'react-redux';

const App: React.FC<{}> = () => {

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;