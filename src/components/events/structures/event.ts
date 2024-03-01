import { CanvasActionType } from "../../../interfaces/enums";
import { Line, Square, createShapeFromJSON } from "../../canvas/shapes/shape";
import { EventBase } from "./base";
import { PenEvent } from "./pen";
import { SquareEvent } from "./square";

/**
 * Create the event form the JSON object uploaded by the user
 * @param eventJson JSON passed in by user
 * @returns Event 
 */
const createEventFromJSON = (eventJson: any): EventBase => {
    if (eventJson.type === CanvasActionType.PEN) 
        return createEvent(
            CanvasActionType.PEN, 
            eventJson.user_name as string,
            eventJson.shape.map((shapeJson: any) => createShapeFromJSON(shapeJson)),
        );

    throw new Error("Unsupported action type present in the JSON")
}

const createEvent = (type: CanvasActionType, user_name: string, shape: any): EventBase => {
    if (type === CanvasActionType.PEN) 
        return new PenEvent(
            user_name,
            shape as Line[],
        )
    if (type === CanvasActionType.SQUARE) 
        return new SquareEvent(
            user_name,
            shape as Square,
        )

    throw new Error("Unsupported action type present in the JSON")
}

/**
 * Load the events from the JSON object uploaded by the user
 * @param eventsJson 
 * @returns 
 */
const loadEventsFromJSON = (eventsJson: { events: object[] } ): EventBase[] => {
    return eventsJson.events.map((eventJson: object) => createEventFromJSON(eventJson));
}

/**
 * Export the events as a JSON for the user to share
 * @param events 
 * @returns JSON to be downloaded by the user
 */
const exportEventsToJSON = (events: EventBase[]): object => {
    return {
        "events": events.map((event: EventBase) => event.exportToJson())
    }
}


export { 
    createEventFromJSON, 
    createEvent, 
    EventBase, 
    PenEvent, 
    exportEventsToJSON,
    loadEventsFromJSON, 
}; 