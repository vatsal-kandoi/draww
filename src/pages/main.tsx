
import * as React from "react";
import Canvas from "../components/canvas/canvas";
import { connect } from "react-redux";
import { EventJSONBase, ShapeTypes, UserAction } from "../interfaces";
import ShapeOptions from "../components/button-groups/shape-options";

const Main: React.FC<{
    selectedShape: ShapeTypes,
    onNewEvent: (eventJSON: EventJSONBase) => void;
}> = (props) => {

    return (
        <>
            <ShapeOptions />
            <Canvas selectedShape={props.selectedShape} onNewEvent={props.onNewEvent}/>  

        </>
    );
}

const mapStateToProps = (state: any) => ({
    selectedShape: state.shape.selectedShape
});

const mapDispatchToProps = (dispatch: any) => ({
    onNewEvent: (event: EventJSONBase) => {
        dispatch({
            type: UserAction.NEW_EVENT_ADDED,
            payload: event
        })
    },
});

export default connect(mapStateToProps , mapDispatchToProps)(React.memo(Main));