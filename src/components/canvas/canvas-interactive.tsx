import React from "react";
import { connect } from "react-redux";
import { CanvasEventType } from "../../interfaces/enums";
import { EventBase } from "../events/structures/event";
import useDisplayManager from "./hooks/displayManager";
import CanvasBase, { ICanvasRefs } from "./canvas-base";
import useShapeCaptureManager from "./hooks/shapeCaptureManager";

interface ICanvasProps {
    onNewEvent: (event: EventBase) => void;
}

const InteractiveCanvas: React.FC<ICanvasProps> = (props) => {
    const canvasBaseRefs = React.useRef<ICanvasRefs>(null);
    const manager = useShapeCaptureManager();
    const event = useDisplayManager(canvasBaseRefs.current, manager);

    // Destructured props outside of use-effect to not re-run use effect on any props re-render
    const createNewEvent = props.onNewEvent;

    React.useEffect(() => {
        if (event !== undefined) 
            createNewEvent(event);
    }, [event, createNewEvent]);
    
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

const mapDispatchToProps = (dispatch: any) => ({
    onNewEvent: (event: EventBase) => dispatch({ 
        type: CanvasEventType.ADD,
        payload: event
    }),
});
  
export default connect(null, mapDispatchToProps)(InteractiveCanvas);