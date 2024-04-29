import * as React from "react";
import { CanvasManagerInterface, setupCanvasRenderer } from "../../canvas/api";
import CanvasRaw from "./base";
import { EventJSONBase, ShapeTypes } from "../../interfaces";

export interface ICanvasRefs {
    workerAPI: CanvasManagerInterface;    
    sendShapeSelectionChange: (shape: ShapeTypes) => void;
    setupNewEventListener: (cb: (event: EventJSONBase) => void) => void;
}

const Canvas = React.forwardRef<ICanvasRefs, {}>((props, refs) => {
    const api: CanvasManagerInterface = React.useMemo(() => {
        return setupCanvasRenderer();
    }, []);

    const mouseMoveEvent = React.useCallback((mouseMoveEvt: MouseEvent) => {
        const isPressed = mouseMoveEvt.buttons !== 0 && mouseMoveEvt.button === 0;
        const x = mouseMoveEvt.clientX;
        const y = mouseMoveEvt.clientY;
        api.sendMouseCoordinates({ x, y }, isPressed);
    }, [api]);

    const mouseDownEvent = React.useCallback((mouseMoveEvt: MouseEvent) => {
        const x = mouseMoveEvt.clientX;
        const y = mouseMoveEvt.clientY;
        api.sendMouseCoordinates({ x, y }, true);
    }, [api]);

    React.useEffect(() => {
        document.addEventListener("mousemove", mouseMoveEvent);
        document.addEventListener("mousedown", mouseDownEvent);
        
        return () => {
            api.cleanup();
            document.removeEventListener("mousemove", mouseMoveEvent);
            document.removeEventListener("mousedown", mouseDownEvent);
        };
    }, [api, mouseMoveEvent]);

    React.useImperativeHandle(refs, () => ({
        workerAPI: api,
        sendShapeSelectionChange: (shape: ShapeTypes) => {
            api.sendShapeSelectionChange(shape);
        },
        setupNewEventListener: (cb: (event: EventJSONBase) => void): void => {
            api.setupNewEventListener(cb);
        }
    }));

    const onCanvasMount = React.useCallback((canvas: HTMLCanvasElement) => {
        const offscreen  = canvas.transferControlToOffscreen();
        api.initialiseCanvas(offscreen, {x: canvas.width, y: canvas.height});
    }, [api]);

    const onTemporaryCanvasMount = React.useCallback((canvas: HTMLCanvasElement) => {
        const offscreen  = canvas.transferControlToOffscreen();
        api.initialiseTemporaryCanvas(offscreen, {x: canvas.width, y: canvas.height});
    }, [api]);

    return (
        <>
            <CanvasRaw 
                onCanvasMount={onCanvasMount} 
                onTemporaryCanvasMount={onTemporaryCanvasMount}/> 
        </>
    );
});

export default React.memo(Canvas);


