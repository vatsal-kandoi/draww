import { CanvasActionType } from "../interfaces/enums";
import { Line, createShapeFromJSON } from "./shape";

class Event {
    protected event_name: string;

    constructor() {
        this.event_name = this.getNewEventID();
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
}

class PenEvent extends Event {

    public type: CanvasActionType = CanvasActionType.PEN;
    private shape: Line[];
    private user_name: string;

    constructor(user_name: string, shape: Line[]) {
        super();
        this.user_name = user_name;
        this.shape = shape;
    }

    public exportToJson() {
        return {
            user_name: this.user_name,
            type: this.type,
            shape: this.shape.forEach((shape) => shape.exportToJson()),
        }
    }

    public render(contextAPI: CanvasRenderingContext2D) {
        this.shape.forEach((shape) => {
            shape.render(contextAPI);
        })
    }
}

const createEventFromJSON = (eventJson: any): any => {
    if (eventJson.type === CanvasActionType.PEN) 
        return new PenEvent(
            eventJson.user_name as string,
            eventJson.shape.forEach((shapeJson: any) => createShapeFromJSON(shapeJson)),
        )

}


class EventManager {

    public events: Event[];

    constructor() {
        this.events = [];
    }


    public loadFromJson(eventsJson: any) {
        this.events = eventsJson.events.forEach((eventJson: any) => createEventFromJSON(eventJson));
    }

    public exportToJson() {
        return {
            "events": this.events.forEach((event: any) => event.exportToJson())
        }
    }
}



export { createEventFromJSON, PenEvent, EventManager }; 