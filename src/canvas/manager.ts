import { Point } from "../interfaces";
import { ShapeManager } from "./structures/manager";

export class CanvasManager {
    user_name: string | null;
    offscreen_canvas: OffscreenCanvasRenderingContext2D | null;
    shapeManager: ShapeManager;
    isMouseDown: boolean = false;
    dimensions: Point = {x: -1, y: -1};

    constructor() {
        this.user_name = null;
        this.offscreen_canvas = null;
        this.shapeManager = new ShapeManager();
    }

    public registerUser(user_name: string) {
        this.user_name = user_name;
    }

    public registerCanvas(canvas: OffscreenCanvas, dimensions: Point ) {
        const context = canvas.getContext("2d") 
        if (context=== null) return;
        this.offscreen_canvas = context as OffscreenCanvasRenderingContext2D;
        this.dimensions = dimensions;
    }

    public registerMouseMoveEvent(point: Point, isMouseDown: boolean) { 
        // Mouse has been pressed previously
        if (this.offscreen_canvas === null) return;
        console.log(point);
        if (this.isMouseDown) {
            // Still pressed
            if (isMouseDown) {
                this.shapeManager.captureShape(this.offscreen_canvas, point, this.dimensions);
            } else {
                // Capture shape and send to user
                this.shapeManager.finalizeShape();
            }
        } else {
            if (isMouseDown) {
                this.shapeManager.captureShape(this.offscreen_canvas, point, this.dimensions);
            }
        }
        this.isMouseDown = isMouseDown;
    }
}