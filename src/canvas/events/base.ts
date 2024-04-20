import { EventJSONBase, IEventBase, Point, ShapeTypes } from "../../interfaces";

export class EventBase implements IEventBase {
    public type: ShapeTypes = ShapeTypes.NONE;    
    public event_name: string;
    public user_name: string;
    public description: string;
    public capture_canvas_dimensions: Point;
    public current_canvas_dimensions: Point;

    constructor(capture_canvas_dimensions: Point, current_canvas_dimensions: Point, user_name: string, description: string) {
        this.current_canvas_dimensions = current_canvas_dimensions;
        this.capture_canvas_dimensions = capture_canvas_dimensions;
        this.event_name = this.getNewEventID();
        this.description = description;
        this.user_name = user_name;
    }

    /**
     * Validate if events match based on the name
     * @param other IEventBase
     * @returns boolean
     */
    public isEqual(other: IEventBase) {
        return this.event_name === other.event_name;
    }

    /**
     * Get a randomized event name for the given event
     * @returns string
     */
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

    /**
     * Render the event onto the canvas
     * @param contextAPI Convext API for the canvas 
     */
    public render(contextAPI: OffscreenCanvasRenderingContext2D) {
        throw new Error("Not implemented");
    }

    public select(contextAPI: OffscreenCanvasRenderingContext2D) {
        throw new Error("Not implemented");
    }

    /**
     * Export the event as a JSON object
     */
    public exportToJson(): EventJSONBase {
        throw new Error("Not implemented");
    }
}
