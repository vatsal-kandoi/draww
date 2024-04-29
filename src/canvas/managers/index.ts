import {  IProperties, IPropertiesChange, IThemeChange, Point, ShapeTypes } from "../../interfaces";
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
    }

    public onMouseMoveEvent(point: Point, isMouseDown: boolean): null | EventBase {
        if (this.selectionManager.isEnabled()) return this.onMouseMoveForSelection(point, isMouseDown);
        return this.onMouseMoveForDraw(point, isMouseDown);
    }

    private onMouseMoveForSelection(point: Point, isMouseDown: boolean): null | EventBase {
        const event = this.selectionManager.onMouseMoveEvent(point, isMouseDown);
        return event;
    }

    private onMouseMoveForDraw(point: Point, isMouseDown: boolean): null | EventBase {
        const shape = this.shapeManager.onMouseMoveEvent(point, isMouseDown);

        if (shape === null)
            return null;

        const event = this.eventManager.createEvent(this.shapeManager.active_shape, shape)
        return event;
    }

    public onPropertiesChange(properties: IPropertiesChange) {
        this.shapeManager.onPropertiesChange(properties);
    }

    public onThemeChange(properties: IThemeChange) {
        this.renderManager.onSelectionColorChange(properties.select_color);
    }
}