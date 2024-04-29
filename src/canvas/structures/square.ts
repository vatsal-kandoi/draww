import { ISquare, SquareShapeJSON, Point } from "../../interfaces";
import { normalizeCoordinates } from "../utils";
import shift from "../utils/shift";
import { ShapeBase } from "./base";

export class Square extends ShapeBase implements ISquare {
    from_point: Point;
    to_point: Point; 

    constructor(from_point: Point, to_point: Point) {
        super();
        this.from_point = from_point;
        this.to_point = to_point;
    }

    public render(context: OffscreenCanvasRenderingContext2D, capture_canvas_dimensions: Point, current_canvas_dimensions: Point): void {
        const fromCoords = normalizeCoordinates(this.from_point, current_canvas_dimensions, capture_canvas_dimensions);
        const toCoords = normalizeCoordinates(this.to_point, current_canvas_dimensions, capture_canvas_dimensions);
        context.strokeStyle = "#000";
        context.strokeRect(
            fromCoords.x, 
            fromCoords.y, 
            (toCoords.x - fromCoords.x),
            (toCoords.y - fromCoords.y)
        );                     
    }    

    public shift(from_point: Point, to_point: Point) {
        this.from_point = shift(this.from_point, from_point, to_point);
        this.to_point = shift(this.to_point, from_point, to_point);
    }

    public exportToJson(): SquareShapeJSON {
        return {
            from_point: this.from_point,
            to_point: this.to_point,
        }
    }
}

