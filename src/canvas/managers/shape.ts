import { IProperties, IPropertiesChange, Point, ShapeTypes } from "../../interfaces";
import { ShapeBase } from "../structures/base";
import { Line } from "../structures/line";
import { RenderManager } from "./render";
import { Square } from "../structures/square";
import comparePoints from "../utils/comparePoints";

const DEFAULT_POINT: Point = { x: -1, y: -1 };

export class ShapeManager {
    public active_shape: ShapeTypes = ShapeTypes.NONE;
    public shape: any = null;
    public renderManager: RenderManager;
    private start_coordinates: Point = DEFAULT_POINT;
    private last_coordinates: Point = DEFAULT_POINT;
    private is_mouse_down: boolean = false;
    private properties: IProperties = {
        borderColor: "#000",
    };

    constructor(renderManager: RenderManager) {
        this.renderManager = renderManager;
    }

    onPropertiesChange(properties: IPropertiesChange) {
        this.properties = properties;
    }

    public reset(): void {
        this.last_coordinates = DEFAULT_POINT;
        this.start_coordinates = DEFAULT_POINT;
        this.is_mouse_down = false;
        this.shape = null;
        this.renderManager.clearLayer();        
    }

    public isEnabled(): boolean {
        return this.active_shape !== ShapeTypes.NONE;
    }

    public onSelectedShapeChange(selected_shape: ShapeTypes) {
        this.active_shape = selected_shape;
        this.reset();
    }
    
    public onMouseMoveEvent(point: Point, isMouseDown: boolean) : ShapeBase | ShapeBase[] | null  {
        let shape = null;
        switch(this.active_shape) {
            case ShapeTypes.LINE: {
                shape = this.captureLine(point, isMouseDown);
                break;
            }
            case ShapeTypes.SQUARE: {
                shape = this.captureSquare(point, isMouseDown);
                break;
            }
        }
        return shape;     
    }

    private captureLine(point: Point, isMouseDown: boolean): Line[] | null {
        if (comparePoints(this.last_coordinates, DEFAULT_POINT) && !this.is_mouse_down) {
            if (isMouseDown) {
                this.last_coordinates = point;
                this.is_mouse_down = true;
            }
            return null;
        }
        
        if (isMouseDown) {
            const line = new Line(this.last_coordinates, point, this.properties.borderColor);
                
            if (this.shape === null)    
                this.shape = [];

            this.shape.push(line);
            this.renderManager.renderShapeOnLayer(line);
            this.last_coordinates = point;

            return null;
        }
        const shape = (this.shape !== null) ? this.shape : null;

        this.reset();
        (shape as Line[])?.forEach((line) => this.renderManager.renderShape(line));

        return shape;
    }

    private captureSquare(point: Point, isMouseDown: boolean): Square | null {
        if (comparePoints(this.start_coordinates, DEFAULT_POINT) && !this.is_mouse_down) {
            if (isMouseDown) {
                this.start_coordinates = point;
                this.is_mouse_down = true;
            }
            return null;
        }
        
        if (isMouseDown) {
            this.renderManager.clearLayer();
            const square = new Square(this.start_coordinates, point, this.properties.borderColor);
                
            this.shape = square;
            this.renderManager.renderShapeOnLayer(square);

            return null;
        }
        const shape = (this.shape !== null) ? this.shape : null;
        this.reset();

        if (shape === null) return null;

        this.renderManager.renderShape(shape);
        return shape;
    }
}