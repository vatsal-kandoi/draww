import * as React from "react";
import { EventBase } from "../../events/structures/base";
import { ICanvasRefs } from "../canvas-base";
import { DEFAULT_NULL_POINT, useMouseCurrentPositionProvider } from "../../../hooks/mousePositionProvider";
import { IPoint } from "../../../interfaces/shapes";
import { useSelector } from "react-redux";
import { areEventsEqual } from "../../utils";
import ShapeCaptureManager from "../managers/capture";

/**
 * Controls the canvas element
 * @param canvasRefs Refs to the canvas elemenrs
 * @param manager Manager to control shape generation
 * @returns Created event
 */
const useDisplayManager = (
    canvasRefs: ICanvasRefs | null,
    manager: ShapeCaptureManager | null
): EventBase | undefined => {
    const events: EventBase[] = useSelector(state => (state as any)?.events?.events);
    const [event, setEvent] = React.useState<EventBase>();
    const {
        clickPosition,
        currentPositions,
        onClick
    } = useMouseCurrentPositionProvider();

    const [renderedEvents, setRenderedEvents] = React.useState<EventBase[]>([]);
    const [prevOrInitialPosition, setPrevPosition] = React.useState<IPoint>(DEFAULT_NULL_POINT);
    const user: string = useSelector(state => (state as any)?.user?.user_name);    

    // We mostly need this when events are loaded by the user
    React.useEffect(() => {
        if (areEventsEqual(events, renderedEvents)) return;        
        if(canvasRefs === null) return;
        canvasRefs.clearCanvas();
        events.forEach((event: EventBase) => {
            canvasRefs.renderEventOnCanvas(event);
        });
        setRenderedEvents(events);
    }, [events, canvasRefs]);

    const shouldNotContinueToCaptureShape = React.useCallback(() => {
        return prevOrInitialPosition === DEFAULT_NULL_POINT && clickPosition !== DEFAULT_NULL_POINT;
    }, [prevOrInitialPosition, clickPosition]);

    React.useEffect(() => {
        // When the user presses the mouse / touch
        if (manager === null) return;

        if (onClick) {
            if (shouldNotContinueToCaptureShape()){
                setPrevPosition(clickPosition);
                return;
            };
            setPrevPosition(currentPositions);
            const shape = manager.captureShape(prevOrInitialPosition, currentPositions);
            canvasRefs?.renderShapeOnCanvas(shape);
            
        } else {
            setPrevPosition(DEFAULT_NULL_POINT);
            const evt = manager.createEvent(user);
            manager.reset();
            if (evt === null) return;
            setEvent(evt);
        }

    }, [currentPositions, onClick, clickPosition, manager])

    return event;
};

export default useDisplayManager;