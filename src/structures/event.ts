import { IAttributeOptions } from "../interfaces/attributeOptions";
import { CanvasActionType } from "../interfaces/enums";
import { IPoint } from "../interfaces/shapes";
import { Line, createShapeFromJSON } from "./shape";

class Event {
    public event_name: string;
    public type: CanvasActionType = CanvasActionType.PEN;
    public user_name: string;
    public description: string;
    protected shape: any;

    constructor(user_name: string, description: string, shape: any) {
        this.event_name = this.getNewEventID();
        this.description = description;
        this.user_name = user_name;
        this.shape = shape;
    }

    public isEqual(other: Event) {
        return this.event_name === other.event_name;
    }

    protected getNewEventID() {
        const length = 10;
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    public render(contextAPI: CanvasRenderingContext2D) {
        throw new Error("Not implemented");
    }
}

class PenEvent extends Event {

    public type: CanvasActionType = CanvasActionType.PEN;

    constructor(user_name: string, shape: Line[]) {
        super(user_name, `created ${shape.length} lines`, shape);
    }

    public exportToJson() {
        return {
            user_name: this.user_name,
            type: this.type,
            shape: (this.shape as Line[]).map((shape) => shape.exportToJson()),
        }
    }

    public render(contextAPI: CanvasRenderingContext2D) {
        (this.shape as Line[]).forEach((shape) => {
            shape.render(contextAPI);
        })
    }
}

const createEventFromJSON = (eventJson: any): any => {
    if (eventJson.type === CanvasActionType.PEN) 
        return createEvent(
            CanvasActionType.PEN, 
            eventJson.user_name as string,
            eventJson.shape.map((shapeJson: any) => createShapeFromJSON(shapeJson)),
        );

}

const createEvent = (type: CanvasActionType, user_name: string, shape: any): Event | null => {
    if (type === CanvasActionType.PEN) 
        return new PenEvent(
            user_name,
            shape,
        )
        
    return null;
}

class EventCaptureManager {
    private actionType: CanvasActionType;
    private attributes: IAttributeOptions;
    private shape: any;

    private generateDefaultShape(actionType: CanvasActionType) {
        if (actionType === CanvasActionType.PEN) {
            return [];
        }
        return null;
    }

    constructor(actionType: CanvasActionType, attributes: IAttributeOptions) {
        this.actionType = actionType;
        this.attributes = attributes;
        this.shape = this.generateDefaultShape(actionType);
    }

    public clear() {
        this.shape = this.generateDefaultShape(this.actionType);
    }

    public isEquals(self: any, other: any) {
        if (this.actionType === CanvasActionType.PEN) {
            return self.length === other.length && self.every((value: Line, index: number) => value === other[index]);
        }
        return true;
    }

    public hasCapturedShape() {
        return !this.isEquals(this.shape, this.generateDefaultShape(this.actionType));
    }

    public generateEvent(user_name: string) {
        const shape = this.shape;
        this.clear();
        return createEvent(this.actionType, user_name, shape);
    }

    private registerLineOnCanvas(current: IPoint, previous: IPoint, context: CanvasRenderingContext2D) { 
        const shape = new Line(previous, current, this.attributes.color);
        shape.render(context);
        this.shape.push(shape);
    }

    public registerShapeOnCanvas(current: IPoint, previous: IPoint, context: CanvasRenderingContext2D) { 
        if (this.actionType === CanvasActionType.PEN)
            return this.registerLineOnCanvas(current, previous, context);
    }
}


const loadEventsFromJSON = (eventsJson: any): Event[] => {
    return eventsJson.events.map((eventJson: any) => createEventFromJSON(eventJson));
}

const exportEventsToJSON = (events: Event[]): any => {
    return {
        "events": events.map((event: any) => event.exportToJson())
    }
}
export { 
    createEventFromJSON, 
    createEvent, 
    Event, 
    PenEvent, 
    exportEventsToJSON,
    loadEventsFromJSON, 
    EventCaptureManager 
}; 