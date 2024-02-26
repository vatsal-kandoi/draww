import * as React from 'react';
import ThemeProviderContext from "./contexts/themeprovider";
import LanguageProviderContext from './contexts/languageprovider';
import useThemeProvider from "./hooks/themeprovider"
import { ThemeProvider } from '@mui/material/styles';
import { useLanguageProvider } from './hooks/languageprovider';
import { Provider } from 'react-redux'
import store from './redux/store';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CanvasPage from './pages/main';
import AuthPage from './pages/auth';

const App: React.FC<{}> = () => {
  const {themeContextValue, theme} = useThemeProvider();
  const languageContextValue = useLanguageProvider();

  return (
    <BrowserRouter basename="/">
      <Provider store={store}>
        <ThemeProviderContext.Provider value={themeContextValue}>
          <LanguageProviderContext.Provider value={languageContextValue}>        
            <ThemeProvider theme={theme}>
              <Routes>
                <Route path="/" Component={AuthPage}>
                </Route>
                <Route path="/home/" Component={CanvasPage} />
              </Routes>
            </ThemeProvider>
          </LanguageProviderContext.Provider>
        </ThemeProviderContext.Provider>
      </Provider>
    </BrowserRouter>      
  );
}

export default App;