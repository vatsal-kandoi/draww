import { RefObject, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CanvasEventType } from "../interfaces/enums";
import { Event } from "../structures/event";

const useEventDeletionEvents = (canvasRef: RefObject<HTMLCanvasElement>) => {
    const eventsDeleted: Event[] = useSelector(state => (state as any)?.events?.deletedEvents)    
    const allEvents: Event[] = useSelector(state => (state as any)?.events?.events)    
    const dispatch = useDispatch();

    useEffect(() => {
        if(eventsDeleted === null || eventsDeleted === undefined || eventsDeleted.length === 0) return;
        if(canvasRef.current === null) return;

        const context = canvasRef.current.getContext("2d");
        if (context === null) return;

        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        allEvents.forEach((event: Event) => {
            event.render(context);
        })

        dispatch({type: CanvasEventType.DELETE_CONFIRMED })        
    }, [eventsDeleted]);    
}

export default useEventDeletionEvents;