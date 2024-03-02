import { CanvasActionType } from "../../../interfaces/enums";
import { IPoint } from "../../../interfaces";

class EventBase {
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

    /**
     * Validate if events match based on the name
     * @param other Event
     * @returns boolean
     */
    public isEqual(other: EventBase) {
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
    public render(contextAPI: CanvasRenderingContext2D, currentDimensions: IPoint) {
        throw new Error("Not implemented");
    }

    /**
     * Export the event as a JSON object
     */
    public exportToJson() {
        throw new Error("Not implemented");
    }
}

export { EventBase };