import * as React from "react";
import { Mode } from "../interfaces";
import { createTheme } from '@mui/material/styles';

/**
 * Custom hook to provide the theme for the react application and get the default value for the 
 * ThemeProvider. This would be utilized by components
 */
function useThemeProvider() {
    const [theme, setTheme] = React.useState<Mode>(Mode.DARK);

    const themeContextValue = {
        toggleTheme: () => {
            setTheme((prevTheme) => (prevTheme === Mode.LIGHT ? Mode.DARK : Mode.LIGHT));
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