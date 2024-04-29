import { Point } from "../../interfaces";
import { EventBase } from "../events/base";
import { ShapeBase } from "../structures/base";

const DEFAULT_POINT = { x: -1, y: -1 };

export class RenderManager {
    public offscreen_temporary_canvas: OffscreenCanvasRenderingContext2D | null = null;
    private offscreen_canvas: OffscreenCanvasRenderingContext2D | null = null;
    public current_canvas_dimensions: Point = DEFAULT_POINT;    

    public initialiseCanvas(canvas: OffscreenCanvas, dimensions: Point) {
        const context = canvas.getContext("2d") 
        if (context=== null) return;
        this.offscreen_canvas = context as OffscreenCanvasRenderingContext2D;
        this.current_canvas_dimensions = dimensions;
    }    

    public initialiseLayer(canvas: OffscreenCanvas, dimensions: Point) {
        const context = canvas.getContext("2d") 
        if (context=== null) return;
        this.offscreen_temporary_canvas = context as OffscreenCanvasRenderingContext2D;
    }
    public renderShape(shape: ShapeBase): void {
        if (this.offscreen_canvas === null) return;
        shape.render(this.offscreen_canvas, this.current_canvas_dimensions, this.current_canvas_dimensions);
    }

    public renderShapeOnLayer(shape: ShapeBase): void {
        if (this.offscreen_temporary_canvas === null) return;
        shape.render(this.offscreen_temporary_canvas, this.current_canvas_dimensions, this.current_canvas_dimensions);
    }

    public selectEvent(event: EventBase): void {
        if (this.offscreen_temporary_canvas === null) return;
        event.select(this.offscreen_temporary_canvas);
    }

    public renderEvent(event: EventBase): void {
        if (this.offscreen_canvas === null) return;
        event.render(this.offscreen_canvas);
    }

    public renderEventOnLayer(event: EventBase): void {
        this.clearLayer();
        if (this.offscreen_temporary_canvas === null) return;
        event.render(this.offscreen_temporary_canvas);
    }    

    public clearLayer(): void {
        if (this.offscreen_temporary_canvas === null) return;
        this.offscreen_temporary_canvas.clearRect(0, 0, this.current_canvas_dimensions.x, this.current_canvas_dimensions.y);
    }

    public clearCanvas(): void {
        if (this.offscreen_canvas === null) return;
        this.offscreen_canvas.clearRect(0, 0, this.current_canvas_dimensions.x, this.current_canvas_dimensions.y);
    }    
}