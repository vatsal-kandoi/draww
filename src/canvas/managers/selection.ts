import { DEFAULT_POINT, IUserEvent, Point, Shapes } from "../../interfaces";
import { Renderer } from "../render";
import { EventStore } from "../store";

export class SelectionManager {

    shape: Shapes = Shapes.NONE;
    active_event: IUserEvent | null = null;
    is_mouse_down: boolean = false;
    last_coordinates: Point = DEFAULT_POINT;

    /** Change whether the selection is enabled or not based on shape type */
    public isEnabled(): boolean {
        return this.shape === Shapes.NONE;
    }

    /**
     * Handle changes to the selected shape
     * @param shape 
     */
    public onCanvasSelectedShapeChange(shape: Shapes): void {
        this.shape = shape;
        this.reset();
    }

    public reset(): void {
        this.active_event = null;
        this.last_coordinates = DEFAULT_POINT;
        this.is_mouse_down = false;
    }

    /**
     * Handle movements of mouse, and render accordingly
     * @param point Cursor on point
     * @param is_mouse_down Whether mouse is clicked
     */
    public onMouseMovement(point: Point, is_mouse_down: boolean): IUserEvent | null {
        if (this.isShiftingEvent(point)) {
            const event = this.shiftEvent(point, is_mouse_down);
            return event;
        }
        // Try selecting event
        this.selectEvent(point, is_mouse_down);
        return null;
    }

    private isShiftingEvent(point: Point): boolean {
        return this.active_event !== null && this.is_mouse_down;
    }    

    private shiftEvent(point: Point, is_mouse_down: boolean): IUserEvent | null {
        if (this.active_event === null) return null;

        const renderer = Renderer.getInstance()
        if (is_mouse_down) {
            // Conitnue shifting
            this.active_event?.shift(this.last_coordinates, point);
            renderer.shift(this.active_event);
            this.last_coordinates = point;
            
            return null;
        } else {
            // Complete shifting
            const event = this.active_event;
            this.is_mouse_down = false;
            this.last_coordinates = DEFAULT_POINT;
            renderer.select(event);
            return event;
        }
    }
    private selectEvent(point: Point, is_mouse_down: boolean) {
        if (is_mouse_down) {
            const event = this.getEventAgainstPoint(point);
            const renderer = Renderer.getInstance();

            // Remove selection
            if (event === null) {
                this.reset();
                renderer.pushObjectsOntoCanvas();
            }
            else if (this.active_event === null || !this.active_event.isEqual(event)) {                
                this.active_event = event;
                renderer.select(this.active_event);
            }   

            this.last_coordinates = point;
            this.is_mouse_down = true;
        } else {
            this.reset();
        }
    }

    private getEventAgainstPoint(point: Point): IUserEvent | null {
        const events = EventStore.getInstance().getAllEvents();
        console.log(events);
        let event: IUserEvent | null = null;        
        for (let idx = events.length - 1; idx >= 0; idx-- ) {
            if (events[idx].containsPoint(point)) {
                event = events[idx];
                break;
            }
        }
        return event;
    }
}
