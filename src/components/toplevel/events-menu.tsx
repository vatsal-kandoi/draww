import * as React from "react";
import ActionButtonGroup from '../buttons/action-group';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Events from "../events/events";
import { CanvasEventType } from "../../interfaces/enums";
import { connect } from "react-redux";
import { Event, exportEventsToJSON, loadEventsFromJSON } from "../../structures/event";

const ButtonStack = styled(Stack)(({ theme }) => ({
    ...theme.typography.body2,
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(3),
    width: "300px"
}));


interface IEvents {
    events: Event[],
    registerEventDeletion: any,
    loadEventsFromJSON: any,
}

const EventsMenu: React.FC<IEvents> = (props) => {

    const onDownloadEvents = () => {
        const eventsJson = exportEventsToJSON(props.events);
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(eventsJson));
        const node = document.createElement('a');
        node.setAttribute("href", dataStr);
        node.setAttribute("download", "draww.json");
        node.click();
    }

    const onUploadEvents = () => {        
        const node = document.createElement('input');
        node.type = "file";
        node.click();

        node.onchange = () => {
            const selectedFiles = node.files;
            if (selectedFiles === null) return;
            const reader = new FileReader(); // built in API

            const onLoad = (ev: any) => {
                const eventsJson = JSON.parse(ev.target.result);
                const data = loadEventsFromJSON(eventsJson);
                props.loadEventsFromJSON(data)
            }
            reader.onload = onLoad;
            reader.readAsText(selectedFiles[0]);            
        }

    }

    return (
        <ButtonStack direction="column"
                alignItems="center"
                spacing={2} >
            <ActionButtonGroup onDownloadEvents={onDownloadEvents} 
                    onUploadEvents={onUploadEvents} />
            <Events events={props.events} 
                    registerEventDeletion={props.registerEventDeletion}/>            
        </ButtonStack>
    )
}

const mapStateToProps = (state: any) => ({
    events: state.events.events,
}); 

const mapDispatchToProps = (dispatch: any) => ({
    registerEventDeletion: (event: Event) => dispatch({ 
        type: CanvasEventType.DELETE,
        payload: event
    }),
    loadEventsFromJSON: (events: Event[]) => dispatch({ 
        type: CanvasEventType.LOAD,
        payload: events
    }),
});

  
export default connect(mapStateToProps, mapDispatchToProps)(EventsMenu);