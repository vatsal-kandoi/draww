import * as React from 'react';
import ThemeProviderContext from "./contexts/themeprovider";
import LanguageProviderContext from './contexts/languageprovider';
import useThemeProvider from "./hooks/themeprovider"
import { ThemeProvider } from '@mui/material/styles';
import EventsMenu from './components/toplevel/events-menu';
import CanvasActionBar from './components/toplevel/action-bar';
import AdditionalPropertiesSelector from "./components/toplevel/properties-bar";
import { useLanguageProvider } from './hooks/languageprovider';
import { Provider } from 'react-redux'
import store from './redux/store';

const App: React.FC<{}> = () => {
  const {themeContextValue, theme} = useThemeProvider();
  const languageContextValue = useLanguageProvider();

  return (
    <Provider store={store}>
      <ThemeProviderContext.Provider value={themeContextValue}>
        <LanguageProviderContext.Provider value={languageContextValue}>        
          <ThemeProvider theme={theme}>
            <CanvasActionBar />
            <EventsMenu />
            <AdditionalPropertiesSelector />
          </ThemeProvider>
        </LanguageProviderContext.Provider>
      </ThemeProviderContext.Provider>
    </Provider>
  );
}

export default App;