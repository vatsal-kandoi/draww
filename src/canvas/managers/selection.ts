import { IProperties, Point, ShapeTypes } from "../../interfaces";
import { EventBase } from "../events/base";
import abs from "../utils/abs";
import { EventManager } from "./events";
import { RenderManager } from "./render";

const DEFAULT_POINT = { x: -1, y: -1 };


export class SelectionManager {
    public active_shape: ShapeTypes = ShapeTypes.NONE;
    public renderManager: RenderManager;
    public eventManager: EventManager;
    private last_coordinates: Point = DEFAULT_POINT;
    private active_event: EventBase | null = null;
    private is_mouse_down: boolean = false;


    constructor(eventManager: EventManager, renderManager: RenderManager) {
        this.renderManager = renderManager;
        this.eventManager = eventManager;
    }

    public reset(): void {
        this.last_coordinates = DEFAULT_POINT;
        if (this.active_event !== null) {
            this.renderManager.renderEvent(this.active_event);
        }
        this.active_event = null;
        this.renderManager.clearLayer();
    }

    public isEnabled(): boolean {
        return this.active_shape === ShapeTypes.NONE;
    }

    public onSelectedShapeChange(selected_shape: ShapeTypes) {
        this.active_shape = selected_shape;
        this.reset();
    }

    public isShiftingEvent(point: Point): boolean {
        return this.active_event !== null && this.is_mouse_down;
    }

    private shiftingShape(point: Point, isMouseDown: boolean): EventBase | null {
        if (isMouseDown) {
            if (this.active_event === null) return null;
            this.active_event.shift(this.last_coordinates, point);
            this.renderManager.renderEventOnLayer(this.active_event);
            this.last_coordinates = point;
            return null;
        } else {
            // Compelte shifting
            if (this.active_event === null) return null;
            const event = this.active_event;
            this.eventManager.updateEventAfterMove(event);
            this.selectEvent(event, point);
            this.is_mouse_down = false;
            return event;
        }
    }

    private selectEvent(event: EventBase, point: Point) {
        this.renderManager.clearLayer();
        this.renderManager.clearCanvas();
        const remainingEvents = this.eventManager.events.filter((ev) => ev.event_name !== event.event_name);
        remainingEvents.forEach((ev) => {
            this.renderManager.renderEvent(ev);
        });

        this.renderManager.selectEvent(event);

        this.active_event = event;
        this.last_coordinates = point;
        this.is_mouse_down = true;        
    }

    private deselectEvent() {
        this.renderManager.clearLayer();
        this.renderManager.clearCanvas();
        this.eventManager.events.forEach((ev) => {
            this.renderManager.renderEvent(ev);
        });
        this.active_event = null;
        this.last_coordinates = DEFAULT_POINT;
        this.is_mouse_down = false;
        return null;
    }

    private selectingShape(point: Point, isMouseDown: boolean): EventBase | null {
        if (isMouseDown) {
            // Select event
            const event = this.eventManager.getEventAgainstPoint(point);
            console.log(event);
            if (event !== null) this.selectEvent(event, point);
            else this.deselectEvent();

            return event;
        } else {
            this.is_mouse_down = false;
            return null;
        }
    }


    public onMouseMoveEvent(point: Point, isMouseDown: boolean): EventBase | null {
        if (this.isShiftingEvent(point)) return this.shiftingShape(point, isMouseDown);
        else return this.selectingShape(point, isMouseDown);
    }
    
}