import * as React from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import EventsBar from "./events-bar";
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import { useLanguageStore } from "../../hooks/languageprovider";
import List from '@mui/material/List';
import { EventComponent, LastEventComponent } from "./event";
import { Event } from "../../structures/event";
import { useNavigate } from "react-router-dom";


const ButtonStack = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: "100%"
}));


interface IEvents {
    events: Event[],
    registerEventDeletion: any,
    clearAllEvents: any,
    userCount: number,
}

const Events: React.FC<IEvents> = (props) => {
    const i18n = useLanguageStore();
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();

    const playEvents = () => {
        navigate("/player");
    };

    const handleEventCollapsibleEvent = () => {
      setOpen(!open);
    };
  
    return (
        <ButtonStack square={false} elevation={1}>
            <Stack direction="column">
                <EventsBar playEvents={playEvents} 
                        userCount={props.userCount} 
                        clearAllEvents={props.clearAllEvents}/>
                <Divider />
                <List>
                    <LastEventComponent count={props.events.length} 
                            isOpen={open} 
                            i18n={i18n} 
                            handleEventCollapsibleEvent={handleEventCollapsibleEvent}
                            event={(props.events.length > 0) ? props.events[props.events.length - 1] : null} />
                    <Divider component="li" />
                    <Collapse in={open} timeout="auto">
                        <List component="div" disablePadding={true} style={{maxHeight: '300px', overflow: 'auto'}} >
                            {props.events.map((ev) => {
                                return (<EventComponent showDeleteOption={true}
                                    onDeleteEvent={props.registerEventDeletion}
                                    i18n={i18n} event={ev} />);
                            })}
                        </List>
                    </Collapse>
                </List>                                             
            </Stack>
        </ButtonStack>
    );
}
  
export default Events;