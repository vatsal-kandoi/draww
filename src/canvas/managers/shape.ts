import { Point, ShapeTypes } from "../../interfaces";
import { ShapeBase } from "../structures/base";
import { Line } from "../structures/line";
import { RenderManager } from "./render";

const DEFAULT_POINT: Point = { x: -1, y: -1 };

export class ShapeManager {
    public active_shape: ShapeTypes = ShapeTypes.NONE;
    public shape: any = null;
    public renderManager: RenderManager;
    private last_coordinates: Point = DEFAULT_POINT;
    private is_mouse_down: boolean = false;

    constructor(renderManager: RenderManager) {
        this.renderManager = renderManager;
    }

    public reset(): void {
        this.last_coordinates = DEFAULT_POINT;
        this.is_mouse_down = false;
        this.shape = null;
        this.renderManager.clearLayer();        
    }

    public isEnabled(): boolean {
        return this.active_shape !== ShapeTypes.NONE;
    }

    public canCaptureShape(): boolean {
        return this.last_coordinates.x !== DEFAULT_POINT.x && this.last_coordinates.y !== DEFAULT_POINT.y;
    }

    public onSelectedShapeChange(selected_shape: ShapeTypes) {
        this.active_shape = selected_shape;
        this.reset();
    }
    
    public onMouseMoveEvent(point: Point, isMouseDown: boolean) : ShapeBase | ShapeBase[] | null  {
        if (!this.canCaptureShape()) {
            if (!isMouseDown) return null;
            this.last_coordinates = point;
            this.is_mouse_down = true;
            return null;
        }
        if (isMouseDown) {
            this.captureShape(point);
            this.last_coordinates = point;
            return null;
        } else {
            // Stop capturing shape and finalize
            const shape = (this.shape !== null) ? this.shape : null;

            this.reset();
            this.renderShape(shape);

            return shape;
        }
    }

    private renderShape(shape: ShapeBase | ShapeBase[]): void {
        switch (this.active_shape) {
            case ShapeTypes.LINE: {
                (shape as Line[]).forEach((line) => this.renderManager.renderShape(line));
                break;
            }
        }
    }

    private captureShape(current_position: Point) {
        switch (this.active_shape) {
            case ShapeTypes.LINE: {
                const line = new Line(this.last_coordinates, current_position);
                
                if (this.shape === null)    
                    this.shape = [];

                this.shape.push(line);
                this.renderManager.renderShapeOnLayer(line);
            }
        }
    }
}