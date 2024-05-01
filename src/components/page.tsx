import * as React from "react";
import PageActions from "./button-groups/page-settings";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const PageActionsContainer = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(3),
    width: "100px"
}));


const Page: React.FC<{
    children: React.ReactElement | React.ReactElement[];
}> = ({children}) => {

    return (
        <>
            {children}
            <PageActionsContainer square={false} elevation={1}>
                <PageActions />
            </PageActionsContainer>
        </>
    );
};

export default React.memo(Page);