import {  Point, ShapeTypes } from "../interfaces";
import { EventBase } from "./events/base";
import { EventManager } from "./events/manager";
import { ShapeManager } from "./structures/manager";


export class Manager {

    eventManager: EventManager = new EventManager();
    shapeManager: ShapeManager = new ShapeManager();

    public onUserInit(user_name: string): void {
        this.eventManager.initialise(user_name);
    }

    public onCanvasInit(canvas: OffscreenCanvas, dimensions: Point): void {
        this.eventManager.initialise("Vatsal");
        this.shapeManager.initialise(canvas, dimensions);
    }

    public onSelectedShapeChange(selectedShape: ShapeTypes): void {
        this.shapeManager.onSelectedShapeChange(selectedShape);
        this.shapeManager.reset();
    }

    public onMouseMoveEvent(point: Point, isMouseDown: boolean): null | EventBase {
        const completed = this.shapeManager.onMouseMoveEvent(point, isMouseDown);
        if (!completed) return null;        

        const event = this.eventManager.createEvent(this.shapeManager);
        if (event === null) return null;

        this.shapeManager.reset();
        return event;
    }
}