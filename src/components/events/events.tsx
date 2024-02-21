import * as React from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import EventsBar from "./events-bar";
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import { useLanguageStore } from "../../hooks/languageprovider";
import List from '@mui/material/List';
import { Event, LastEvent } from "./event";


const ButtonStack = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: "100%"
}));


const Events: React.FC<{}> = () => {
    const i18n = useLanguageStore();
    const [open, setOpen] = React.useState(true);
    const eventCount = 100

    const handleEventCollapsibleEvent = () => {
      setOpen(!open);
    };
  

    return (
        <ButtonStack square={false}>
            <Stack direction="column">
                <EventsBar />
                <Divider />
                <List>
                    <LastEvent count={eventCount} 
                            isOpen={open} 
                            i18n={i18n} 
                            handleEventCollapsibleEvent={handleEventCollapsibleEvent}/>
                    <Divider component="li" />
                    <Collapse in={open} timeout="auto">
                        <List component="div" disablePadding={true}>
                            <Event i18n={i18n}/>
                        </List>
                    </Collapse>
                </List>                                             
            </Stack>
        </ButtonStack>
    );
}


export default Events;