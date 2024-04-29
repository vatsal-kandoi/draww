import * as React from 'react';
import ThemeProviderContext from "./contexts/themeprovider";
import { ThemeProvider } from '@mui/material/styles';
import Main from './pages/main';
import store from './redux/store';
import { Provider } from 'react-redux';
import useThemeProvider from './hooks/themeprovider';

const App: React.FC<{}> = () => {
  const {themeContextValue, theme} = useThemeProvider();


  return (
    <Provider store={store}>
      <ThemeProviderContext.Provider value={themeContextValue}>
            <ThemeProvider theme={theme}>
              <Main />
            </ThemeProvider>
        </ThemeProviderContext.Provider>
    </Provider>
  );
}

export default App;