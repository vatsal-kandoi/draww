import React from "react";
import { connect } from "react-redux";
import { CanvasActionType, CanvasEventType } from "../../interfaces/enums";
import { IAttributeOptions } from "../../interfaces/attributeOptions";
import { Event } from "../../structures/event";
import useEventCaptureManager from "../../hooks/eventCaptureManager";
import useCanvasDisplayManager from "../../hooks/canvasDisplayManager";
import CanvasBase, { ICanvasRefs } from "../canvas/canvas-base";

interface ICanvasProps {
    selectedCanvasAction: CanvasActionType,
    registerNewEvent: any,
    attributes: IAttributeOptions
}

const InteractiveCanvas: React.FC<ICanvasProps> = (props) => {
    const canvasBaseRefs = React.useRef<ICanvasRefs>(null);
    const captureManager = useEventCaptureManager(props.selectedCanvasAction, props.attributes);

    const newEvent = useCanvasDisplayManager(captureManager, canvasBaseRefs.current);

    React.useEffect(() => {
        if (newEvent !== undefined) 
            props.registerNewEvent(newEvent);
    }, [newEvent]);

    return (
        <CanvasBase        
            ref={canvasBaseRefs}
            canvasProps={{
                style: {
                    cursor: "pointer", 
                    display: "block"
                }
            }}        
        />
    );
}


const mapStateToProps = (state: any) => ({
    selectedCanvasAction: state.selectedCanvasAction.activeCanvasActionType,
    attributes: state.attributes
}); 


const mapDispatchToProps = (dispatch: any) => ({
    registerNewEvent: (event: Event) => dispatch({ 
        type: CanvasEventType.ADD,
        payload: event
    }),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(InteractiveCanvas);