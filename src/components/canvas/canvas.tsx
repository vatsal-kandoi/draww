import * as React from "react";
import { CanvasManagerInterface, setupCanvasRenderer } from "../../canvas/api";
import CanvasRaw from "./base";
import { EventJSONBase, ShapeTypes } from "../../interfaces";


const Canvas: React.FC<{
    onNewEvent?: (eventJSON: EventJSONBase) => void;
    selectedShape: ShapeTypes,
}> = (props) => {

    const { onNewEvent, selectedShape } = props;

    const api: CanvasManagerInterface = React.useMemo(() => {
        return setupCanvasRenderer();
    }, []);

    const mouseMoveEvent = React.useCallback((mouseMoveEvt: MouseEvent) => {
        const isPressed = mouseMoveEvt.buttons !== 0 && mouseMoveEvt.button === 0;
        const x = mouseMoveEvt.clientX;
        const y = mouseMoveEvt.clientY;
        api.sendMouseCoordinates({ x, y }, isPressed);
    }, [api]);

    React.useEffect(() => {
        document.addEventListener("mousemove", mouseMoveEvent);
        return () => {
            api.cleanup();
            document.removeEventListener("mousemove", mouseMoveEvent);
        };
    }, [api, mouseMoveEvent]);

    React.useEffect(() => {
        api.sendShapeSelectionChange(selectedShape);
    }, [api, selectedShape])

    const onCanvasMount = React.useCallback((canvas: HTMLCanvasElement) => {
        const offscreen  = canvas.transferControlToOffscreen();
        api.setCanvas(offscreen, {x: canvas.width, y: canvas.height});
    }, [api]);

    if (onNewEvent !== undefined)
        api.setupNewEventListener(onNewEvent)

    return (
        <>
            <CanvasRaw onCanvasMount={onCanvasMount} /> 
        </>
    );
} 

export default React.memo(Canvas);


