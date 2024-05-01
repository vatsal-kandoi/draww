import * as React from "react";
import Stack from '@mui/material/Stack';
import ThemeToggle from "../buttons/theme";

interface IPageActions {}


const PageActions: React.FC<IPageActions> = (props) => {

    return (
        <Stack direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2} 
                component="div"
                role="group">
            <ThemeToggle />
        </Stack>
    );
}


export default PageActions;