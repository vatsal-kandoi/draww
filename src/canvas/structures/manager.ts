import { Point, ShapeTypes } from "../../interfaces";
import captureLine from "./line";

const DEFAULT_POINT: Point = { x: -1, y: -1 };

export class ShapeManager {
    public active_shape: ShapeTypes = ShapeTypes.NONE;
    public current_canvas_dimensions: Point = DEFAULT_POINT;
    public shape: any = null;

    private last_coordinates: Point = DEFAULT_POINT;
    private is_mouse_down: boolean = false;
    private offscreen_canvas: OffscreenCanvasRenderingContext2D | null = null;

    public reset(): void {
        this.last_coordinates = DEFAULT_POINT;
        this.is_mouse_down = false;
        this.shape = null;
    }

    public isInitialised(): boolean {
        return this.offscreen_canvas !== null;
    }

    public isInShapeCaptureMode(): boolean {
        return this.active_shape !== ShapeTypes.NONE;
    }

    public canCaptureShape(): boolean {
        return this.last_coordinates.x !== DEFAULT_POINT.x && this.last_coordinates.y !== DEFAULT_POINT.y;
    }

    public initialise(canvas: OffscreenCanvas, dimensions: Point) {
        const context = canvas.getContext("2d") 
        if (context=== null) return;
        this.offscreen_canvas = context as OffscreenCanvasRenderingContext2D;
        this.current_canvas_dimensions = dimensions;
    }

    public onSelectedShapeChange(selected_shape: ShapeTypes) {
        this.active_shape = selected_shape;
    }
    
    public onMouseMoveEvent(point: Point, isMouseDown: boolean): boolean {
        if (this.active_shape === ShapeTypes.NONE) return false;
        if (!this.canCaptureShape()) {
            if (!isMouseDown) return false;
            this.last_coordinates = point;
            this.is_mouse_down = true;
            return false;
        }
        if (isMouseDown) {
            this.captureShape(point);
            this.last_coordinates = point;
            return false;
        } else {
            if (this.shape === null) return false;
            return true;
        }
    }

    public captureShape(current_position: Point) {
        if (this.offscreen_canvas === null) return;
        switch (this.active_shape) {
            case ShapeTypes.LINE: {
                const line = captureLine(
                    current_position, 
                    this.last_coordinates, 
                    this.offscreen_canvas, 
                    this.current_canvas_dimensions, 
                    this.current_canvas_dimensions
                );
                console.log(line)
                if (this.shape === null)    
                    this.shape = [];
                this.shape.push(line);
                break;
            }
        }
    }
}