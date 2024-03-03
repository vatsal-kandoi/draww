import React from "react";
import { connect } from "react-redux";
import { CanvasEventType } from "../../interfaces/enums";
import { EventBase } from "../events/structures/event";
import useDisplayManager from "./hooks/displayManager";
import CanvasBase, { ICanvasRefs } from "./canvas-base";
import useShapeCaptureManager from "./hooks/shapeCaptureManager";
import useRenderManager from "./hooks/renderManager";
import useSelectionManager from "./hooks/selectionManager";
import { useMouseCurrentPositionProvider } from "../../hooks/mousePositionProvider";

interface ICanvasProps {
    onNewEvent: (event: EventBase) => void;
}

const InteractiveCanvas: React.FC<ICanvasProps> = (props) => {
    const {
        clickPosition,
        currentPositions,
        onClick
    } = useMouseCurrentPositionProvider();

    const [isMouseOnCanvas, setIsMouseOnCanvas] = React.useState<boolean>(false);
    const canvasBaseRefs = React.useRef<ICanvasRefs>(null);
    const manager = useShapeCaptureManager();
    const event = useDisplayManager(canvasBaseRefs.current, isMouseOnCanvas, manager, clickPosition, currentPositions, onClick);

    useRenderManager(canvasBaseRefs);
    useSelectionManager(canvasBaseRefs.current, clickPosition, currentPositions, onClick);

    // Destructured props outside of use-effect to not re-run use effect on any props re-render
    const createNewEvent = props.onNewEvent;

    React.useEffect(() => {
        if (event !== undefined) 
            createNewEvent(event);
    }, [event, createNewEvent]);
    
    return (
        <CanvasBase        
            ref={canvasBaseRefs}
            containerProps={
                {
                    onMouseEnter: () => {setIsMouseOnCanvas(true)},
                    onMouseLeave: () => {setIsMouseOnCanvas(false)}    
                }
            }
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