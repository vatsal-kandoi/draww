import { ISquare, ISquareJSON, Point } from "../../../interfaces";
import { normalizeCoordinates, shift } from "../../../utils";
import { ShapeBase } from "./base";

/** Defines the class for square shape available to the user */
export class Square extends ShapeBase implements ISquare {
    from_point: Point;
    to_point: Point; 
    border_color: string;

    constructor(from_point: Point, to_point: Point, border_color: string) {
        super();
        this.from_point = from_point;
        this.to_point = to_point;
        this.border_color = border_color;
    }

    public render(context: OffscreenCanvasRenderingContext2D, capture_canvas_dimensions: Point, current_canvas_dimensions: Point): void {
        const fromCoords = normalizeCoordinates(this.from_point, current_canvas_dimensions, capture_canvas_dimensions);
        const toCoords = normalizeCoordinates(this.to_point, current_canvas_dimensions, capture_canvas_dimensions);
        context.strokeStyle = this.border_color;
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

    public exportToJson(): ISquareJSON {
        return {
            from_point: this.from_point,
            to_point: this.to_point,
            border_color: this.border_color,
        }
    }
}

