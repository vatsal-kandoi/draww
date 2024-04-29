import {  Point, ShapeTypes } from "../../interfaces";
import { EventBase } from "../events/base";
import { EventManager } from "./events";
import { RenderManager } from "./render";
import { SelectionManager } from "./selection";
import { ShapeManager } from "./shape";


export class Manager {

    eventManager: EventManager = new EventManager();
    renderManager: RenderManager = new RenderManager();
    shapeManager: ShapeManager = new ShapeManager(this.renderManager);
    selectionManager: SelectionManager = new SelectionManager(this.eventManager, this.renderManager);

    public onUserInit(user_name: string): void {
        this.eventManager.initialiseUser(user_name);
    }

    public onCanvasInit(canvas: OffscreenCanvas, dimensions: Point): void {
        this.eventManager.initialiseUser("Vatsal");
        this.renderManager.initialiseCanvas(canvas, dimensions);
        this.eventManager.initialiseCanvas(dimensions);
    }

    public onTemporaryCanvasInit(canvas: OffscreenCanvas, dimensions: Point): void {
        this.renderManager.initialiseLayer(canvas, dimensions);
    }

    public onSelectedShapeChange(selectedShape: ShapeTypes): void {
        this.shapeManager.onSelectedShapeChange(selectedShape);
        this.selectionManager.onSelectedShapeChange(selectedShape);
        this.shapeManager.reset();
        this.selectionManager.reset();
    }

    public onMouseMoveEvent(point: Point, isMouseDown: boolean): null | EventBase {
        if (this.selectionManager.isEnabled()) {
            const event = this.selectionManager.onMouseMoveEvent(point, isMouseDown);

            if (event === null)
                return null;

            return event;
        }
        const shape = this.shapeManager.onMouseMoveEvent(point, isMouseDown);

        if (shape === null)
            return null;

        this.renderManager.clearLayer();
        const event = this.eventManager.createEvent(this.shapeManager.active_shape, shape)

        if (event === null) return null;

        this.renderManager.renderEvent(event);
        return event;
    }
}