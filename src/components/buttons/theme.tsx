import * as React from "react";
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ThemeProviderContext from "../../contexts/themeprovider";
import { IconButton, Tooltip } from "@mui/material";
import { Mode } from "../../interfaces";

const ThemeToggle: React.FC<{}> = () => {    
    const theme = useTheme();

    const themeContext = React.useContext(ThemeProviderContext);
    
    return (
        <Tooltip title={'Switch modes'}>
            <IconButton 
                    onClick={themeContext.toggleTheme}
                    size="small">
                {theme.palette.mode === Mode.DARK ? <Brightness7Icon fontSize="inherit" /> : <Brightness4Icon fontSize="inherit" />}
            </IconButton>
        </Tooltip>
    );
}


export default ThemeToggle;