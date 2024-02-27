import { RefObject } from "react";
import { IPoint } from "../interfaces/shapes";
import { Event, EventCaptureManager } from "../structures/event";
import * as React from "react";
import { useSelector } from "react-redux";
import { ICanvasRefs } from "../components/canvas/canvas-base";
import { DEFAULT_NULL_POINT, useMouseCurrentPositionProvider, useMousePressProvider } from "./mousePositionProvider";

const useCanvasDisplayManager = (
    captureManager: EventCaptureManager, canvasRef: ICanvasRefs | null): Event | undefined => {
    const currentPosition = useMouseCurrentPositionProvider();
    const {mouseClickPosition, isMouseClicked} =  useMousePressProvider();

    const [newEvent, setNewEvent] = React.useState<Event>();
    const [currentEventsOnCanvas, setCurrentEventsOnCanvas] = React.useState<Event[]>([]);
    const [prevOrInitialPosition, setPrevPosition] = React.useState<IPoint>(DEFAULT_NULL_POINT);
    const allEventsInState: Event[] = useSelector(state => (state as any)?.events?.events)    
    const user: string = useSelector(state => (state as any)?.user?.user_name)    

    React.useEffect(() => {
        if (allEventsInState.length === currentEventsOnCanvas.length && allEventsInState.every((event, index) => currentEventsOnCanvas[index]?.isEqual(event))) 
            return;
        if(canvasRef === null) return;
        canvasRef.clearCanvas();
        allEventsInState.forEach((event: Event) => {
            canvasRef.renderEventOnCanvas(event);
        });
        setCurrentEventsOnCanvas(allEventsInState);
    }, [allEventsInState, canvasRef]);
            
    React.useEffect(() => {
        console.log(isMouseClicked, prevOrInitialPosition, currentPosition)
        if (isMouseClicked) {            
            if(prevOrInitialPosition === DEFAULT_NULL_POINT && mouseClickPosition !== DEFAULT_NULL_POINT) {
                setPrevPosition(mouseClickPosition);
                return;
            }
            setPrevPosition(currentPosition);
            if(canvasRef === null) return;
            const context = canvasRef.canvasRef?.getContext("2d");
            if (context === null || context === undefined) return;
            captureManager.registerShapeOnCanvas(prevOrInitialPosition, currentPosition, context);
        } else {
            setPrevPosition(DEFAULT_NULL_POINT);
            if (captureManager.hasCapturedShape()) {
                const event = captureManager.generateEvent(user)
                if (event === null) return;
                setCurrentEventsOnCanvas((state) => {return [...state, event]});
                setNewEvent(event);
            }
        }
    }, [currentPosition, isMouseClicked, mouseClickPosition, captureManager, user]);
    
    return newEvent;
};


export default useCanvasDisplayManager;