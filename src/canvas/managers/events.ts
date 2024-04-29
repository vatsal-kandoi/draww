import { Point, ShapeTypes } from "../../interfaces";
import { EventBase } from "../events/base";
import { PenEvent } from "../events/pen";
import { SquareEvent } from "../events/square";
import { ShapeBase } from "../structures/base";
import { Line } from "../structures/line";
import { Square } from "../structures/square";

const DEFAULT_POINT: Point = { x: -1, y: -1 };

export class EventManager {
 
    user_name: string | null =  null;
    events: EventBase[] = [];
    current_canvas_dimensions: Point = DEFAULT_POINT;

    public initialiseCanvas(dimensions: Point) {
        this.current_canvas_dimensions = dimensions;
    }    
    public initialiseUser(user_name: string) {
        this.user_name = user_name;
    }    

    public getEventAgainstPoint(point: Point): EventBase | null {
        let event: EventBase | null = null;        
        for (let idx = this.events.length - 1; idx >= 0; idx-- ) {
            if (this.events[idx].containsPoint(point)) {
                event = this.events[idx];
                break;
            }
        }
        return event;
    }

    public updateEventAfterMove(event: EventBase) {
        this.events = this.events.filter((evt) => evt.event_name !== event.event_name);
        this.events.push(event);
    }

    public isInitialised(): boolean {
        return this.user_name !== null;
    }

    public createEvent(shapeType: ShapeTypes, shape: ShapeBase | ShapeBase[]): EventBase | null {
        if (this.user_name === null) return null;

        switch (shapeType) {
            case ShapeTypes.LINE: {
                const event = new PenEvent(this.current_canvas_dimensions, this.current_canvas_dimensions, this.user_name, shape as Line[]);
                this.events.push(event);
                return event;
            }
            case ShapeTypes.SQUARE: {
                const event = new SquareEvent(this.current_canvas_dimensions, this.current_canvas_dimensions, this.user_name, shape as Square);
                this.events.push(event);
                return event;
            }
        }
        return null;
    }
}