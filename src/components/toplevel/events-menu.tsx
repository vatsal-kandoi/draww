import * as React from "react";
import ActionButtonGroup from '../buttons/action-group';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Events from "../events/events";

const ButtonStack = styled(Stack)(({ theme }) => ({
    ...theme.typography.body2,
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(3),
    width: "300px"
}));

const EventsMenu: React.FC<{}> = () => {

    return (
        <ButtonStack direction="column"
                alignItems="center"
                spacing={2} >
            <ActionButtonGroup />
            <Events />            
        </ButtonStack>
    )
}

export default EventsMenu;