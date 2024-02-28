import * as React from "react";
import { Themes } from "../interfaces/enums";
import { createTheme } from '@mui/material/styles';

/**
 * Custom hook to provide the theme for the react application and get the default value for the 
 * ThemeProvider. This would be utilized by components
 */
function useThemeProvider() {
    const [theme, setTheme] = React.useState<Themes>(Themes.DARK);

    const themeContextValue = {
        toggleTheme: () => {
            setTheme((prevTheme) => (prevTheme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT));
        },
    }

    const muiTheme = createTheme({
        palette: {
            mode: theme,
        },
    });
 
    return { themeContextValue, theme: muiTheme };
}

export default useThemeProvider;