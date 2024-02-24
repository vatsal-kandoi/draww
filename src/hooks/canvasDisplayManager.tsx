import { RefObject } from "react";
import { IPoint } from "../interfaces/shapes";
import { Event, EventCaptureManager } from "../structures/event";
import * as React from "react";
import { useSelector } from "react-redux";

const useCanvasDisplayManager = (captureManager: EventCaptureManager, 
        canvasRef: RefObject<HTMLCanvasElement>, 
        current: IPoint, 
        previous: IPoint, 
        isMousePressed: boolean): Event | undefined => {
    const [newEvent, setNewEvent] = React.useState<Event>();
    const [currentEventsOnCanvas, setCurrentEventsOnCanvas] = React.useState<Event[]>([]);
    const allEventsInState: Event[] = useSelector(state => (state as any)?.events?.events)    

    React.useEffect(() => {
        if (allEventsInState.length === currentEventsOnCanvas.length && allEventsInState.every((event, index) => currentEventsOnCanvas[index]?.isEqual(event))) 
            return;
        if(canvasRef.current === null) return;

        const context = canvasRef.current.getContext("2d");
        if (context === null) return;

        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        allEventsInState.forEach((event: Event) => {
            event.render(context);
        });
        setCurrentEventsOnCanvas(allEventsInState);
    }, [allEventsInState]);
            
    React.useEffect(() => {
        if (isMousePressed) {            
            if (canvasRef.current === null) return;
            const context = canvasRef.current.getContext("2d");
            if (context === null) return;

            captureManager.registerShapeOnCanvas(previous, current, context);
        } else {
            if (captureManager.hasCapturedShape()) {
                const event = captureManager.generateEvent("Vatsal")
                if (event === null) return;
                setCurrentEventsOnCanvas((state) => {return [...state, event]});
                setNewEvent(event);
            }
        }
    }, [current, previous, isMousePressed, captureManager]);
    
    return newEvent;
};


export default useCanvasDisplayManager;