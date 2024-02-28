import * as React from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import { useLanguageStore } from "../../hooks/languageprovider";
import List from '@mui/material/List';
import { EventComponent, LastEventComponent } from "./event";
import { EventBase } from "./structures/event";
import { useNavigate } from "react-router-dom";
import EventActionsBar from "../button-groups/event-actions-bar";


const EventsContainer = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: "100%"
}));

const Events: React.FC<{
    events: EventBase[],
    onEventDeleteBtnClick: (event: EventBase) => void;
    onAllEventsDeleteBtnClick: () => void;
}> = (props) => {
    const i18n = useLanguageStore();
    const [isCollapsibleOpen, setCollapsibleOpen] = React.useState(true);
    const navigate = useNavigate();

    const playEvents = () => navigate("/player");
  
    return (
        <EventsContainer square={false} elevation={1}>
            <Stack direction="column">
                <EventActionsBar onDeleteAllEventsBtnClick={props.onAllEventsDeleteBtnClick}
                        onPlayEventsBtnClick={playEvents}
                        i18n={i18n} />
                <Divider />
                <List>
                    <LastEventComponent eventCount={props.events.length} 
                            isCollapsibleOpen={isCollapsibleOpen}
                            onCollapsibleBtnClick={() => setCollapsibleOpen((prevState) => !prevState)}
                            i18n={i18n} 
                            event={(props.events.length > 0) ? props.events[props.events.length - 1] : null} />
                    <Divider component="li" />
                    <Collapse in={isCollapsibleOpen} timeout="auto">
                        <List component="div" disablePadding={true} style={{maxHeight: '300px', overflow: 'auto'}} >
                            {props.events.map((ev) => {
                                return (
                                    <EventComponent onEventDeleteBtnClick={props.onEventDeleteBtnClick}
                                            showEventDeleteBtn={true}
                                            event={ev}
                                            i18n={i18n} />
                                );
                            })}
                        </List>
                    </Collapse>
                </List>                                             
            </Stack>
        </EventsContainer>
    );
}
  
export default Events;