import * as React from "react";
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ThemeProviderContext from "../../contexts/themeprovider";
import { IconButton } from "@mui/material";
import { useLanguageStore } from "../../hooks/languageprovider";

const ThemeToggle: React.FC<{}> = () => {    
    const theme = useTheme();
    const i18n = useLanguageStore();

    const themeContext = React.useContext(ThemeProviderContext);
    
    return (
        <IconButton 
                onClick={themeContext.toggleTheme} 
                aria-label={i18n.t(`modes_${theme.palette.mode}`)} 
                size="small">
            {theme.palette.mode === 'dark' ? <Brightness7Icon fontSize="inherit" /> : <Brightness4Icon fontSize="inherit" />}
        </IconButton>
    );
}


export default ThemeToggle;
