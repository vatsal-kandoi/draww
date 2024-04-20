import * as React from "react";
import { CanvasManagerInterface, setupCanvasRenderer } from "../../canvas/api";
import CanvasRaw from "./base";


const Canvas: React.FC<{}> = (props) => {

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
    });

    const onCanvasMount = React.useCallback((canvas: HTMLCanvasElement) => {
        const offscreen  = canvas.transferControlToOffscreen();
        api.setCanvas(offscreen, {x: canvas.width, y: canvas.height});
    }, [api]);

    return (
        <>
            <CanvasRaw onCanvasMount={onCanvasMount} /> 
        </>
    );
} 

export default React.memo(Canvas);


