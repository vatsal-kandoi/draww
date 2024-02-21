import * as React from 'react';
import ThemeProviderContext from "./contexts/themeprovider";
import LanguageProviderContext from './contexts/languageprovider';
import useThemeProvider from "./hooks/themeprovider"
import { ThemeProvider } from '@mui/material/styles';
import ActionButtonGroup from './components/buttons/action-group';
import { useLanguageProvider } from './hooks/languageprovider';

const App: React.FC<{}> = () => {
  const {themeContextValue, theme} = useThemeProvider();
  const languageContextValue = useLanguageProvider();

  return (
    <ThemeProviderContext.Provider value={themeContextValue}>
      <LanguageProviderContext.Provider value={languageContextValue}>        
        <ThemeProvider theme={theme}>
          <ActionButtonGroup />
        </ThemeProvider>
      </LanguageProviderContext.Provider>
    </ThemeProviderContext.Provider>
  );
}

export default App;