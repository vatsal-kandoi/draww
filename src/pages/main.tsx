import * as React from "react";
import DrawActions from "../components/button-groups/draw-actions";
import DrawCustomizations from "../components/button-groups/draw-customizations";
import CanvasInteractive from "../components/canvas/canvas-interactive";
import { Stack, styled } from "@mui/material";
import PageActions from "../components/button-groups/page-actions";
import Events from "../components/events/events";
import { connect } from "react-redux";
import { EventBase } from "../components/events/structures/base";
import { CanvasEventType } from "../interfaces/enums";
import { onDownloadEvents, onUploadEvents } from "../components/utils";

const ButtonStack = styled(Stack)(({ theme }) => ({
    ...theme.typography.body2,
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(3),
    width: "300px"
}));

const CanvasPage: React.FC<{
    events: EventBase[];
    deleteAllEvents: () => void;
    deleteEvent: (event: EventBase) => void;
    loadEventsFromJSON: (events: EventBase[]) => void;
}> = (props) => {
    const downloadEvents = () => {
        onDownloadEvents(props.events);
    }

    const uploadEvents = () => {
        onUploadEvents((events: EventBase[]) => {
            props.loadEventsFromJSON(events);
        });
    }


    return (
        <>
            <CanvasInteractive />
            <DrawActions />
            <DrawCustomizations />
            <ButtonStack direction="column"
                    alignItems="center"
                    spacing={2}>
                <PageActions showEventsDownloadBtn={true}
                        showEventsUploadBtn={true}
                        onEventsDownloadBtnClick={downloadEvents}
                        onEventsUploadBtnClick={uploadEvents} />
                <Events events={props.events}
                        onAllEventsDeleteBtnClick={props.deleteAllEvents}
                        onEventDeleteBtnClick={props.deleteEvent} />                   
            </ButtonStack>
        </>
    );
};

const mapStateToProps = (state: any) => ({
    events: state.events.events,
});

const mapDispatchToProps = (dispatch: any) => ({
    deleteEvent: (event: EventBase) => dispatch({ 
        type: CanvasEventType.DELETE,
        payload: event
    }),
    deleteAllEvents: () => dispatch({
        type: CanvasEventType.CLEAR_ALL,
    }),
    loadEventsFromJSON: (events: EventBase[]) => dispatch({ 
        type: CanvasEventType.LOAD,
        payload: events
    }),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(CanvasPage);