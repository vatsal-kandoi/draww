import { IShape, IShapeJSON, Point } from "../../../interfaces";

/** Defines the base class for all shapes available to the user */
export class ShapeBase implements IShape {

    public exportToJson(): IShapeJSON {
        throw new Error("Not implemented");
    }
    public render(context: OffscreenCanvasRenderingContext2D, capture_canvas_dimensions: Point, current_canvas_dimensions: Point): void {
        throw new Error("Not implemented");
    }

    public shift(from_point: Point, to_point: Point) {
        throw new Error("Not implemented");
    }    
}