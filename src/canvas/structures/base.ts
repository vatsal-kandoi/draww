import { IShapeBase, IShapeJSONBase, Point } from "../../interfaces";

export class ShapeBase implements IShapeBase {
    public exportToJson(): IShapeJSONBase {
        throw new Error("Not implemented");
    }
    public render(context: OffscreenCanvasRenderingContext2D, capture_canvas_dimensions: Point, current_canvas_dimensions: Point): void {
        throw new Error("Not implemented");
    }

    public shift(from_point: Point, to_point: Point) {
        throw new Error("Not implemented");
    }    
}