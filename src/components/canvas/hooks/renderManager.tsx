import { useSelector } from "react-redux";
import { EventBase } from "../../events/structures/base";
import { ICanvasRefs } from "../canvas-base";
import * as React from "react";
import { CanvasEventType } from "../../../interfaces/enums";


const useRenderManager = (canvasRefs: React.RefObject<ICanvasRefs>): void => {
    const events: {
        lastAction: CanvasEventType,
        events: EventBase[]
    } = useSelector(state => (state as any)?.events);

    React.useEffect(() => {
        if (events.lastAction === CanvasEventType.ADD || events.lastAction === CanvasEventType.NONE) return;
        const canvasRef = canvasRefs.current
        if(canvasRef === null) return;

        canvasRef.clearCanvas();
        events.events.forEach((event: EventBase) => {
            canvasRef.renderEventOnCanvas(event);
        });
    }, [events, canvasRefs]);
}

export default useRenderManager;