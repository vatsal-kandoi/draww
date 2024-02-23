import { RefObject, useEffect } from "react";
import { IEvent } from "../interfaces/events";
import { useSelector, useDispatch } from "react-redux";
import { CanvasEventType } from "../interfaces/enums";
import { ILine } from "../interfaces/shapes";

const useEventDeletionEvents = (canvasRef: RefObject<HTMLCanvasElement>) => {
    const eventsDeleted: IEvent[] = useSelector(state => (state as any)?.events?.eventsToBeRemoved)    
    const allEvents: IEvent[] = useSelector(state => (state as any)?.events?.events)    
    const dispatch = useDispatch();

    useEffect(() => {
        if(eventsDeleted === null || eventsDeleted === undefined || eventsDeleted.length === 0) return;
        if(canvasRef.current === null) return;

        const context = canvasRef.current.getContext("2d");
        if (context === null) return;

        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        allEvents.forEach((event) => {
            console.log(event)
            event.shape.forEach((line: ILine) => {
                context.strokeStyle = line.color;
                context.beginPath();
                context.moveTo(line.fromCoords.x, line.fromCoords.y);
                context.lineTo(line.toCoords.x, line.toCoords.y);
                context.closePath();
                context.stroke();                   
            })
        })

        dispatch({type: CanvasEventType.DELETE_CONFIRMED })        
    }, [eventsDeleted]);    
}

export default useEventDeletionEvents;