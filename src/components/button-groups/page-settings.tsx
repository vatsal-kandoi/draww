import * as React from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ThemeToggle from "../buttons/theme";

const ActionButtonGroupContainer = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: "100%"
}));

interface IPageActions {

}


const PageActions: React.FC<IPageActions> = (props) => {

    return (
        <ActionButtonGroupContainer square={false} elevation={1}>
            <Stack direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2} 
                    component="div"
                    role="group">

                <ThemeToggle />
            </Stack>
        </ActionButtonGroupContainer>
    );
}


export default PageActions;