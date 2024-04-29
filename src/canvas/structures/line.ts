import { ILine, LineJSON, Point } from "../../interfaces";
import { normalizeCoordinates } from "../utils";
import shift from "../utils/shift";
import { ShapeBase } from "./base";

export class Line extends ShapeBase implements ILine {
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

        context.beginPath();
        context.strokeStyle = this.border_color;
        context.moveTo(fromCoords.x, fromCoords.y);
        context.lineTo(toCoords.x, toCoords.y);
        context.closePath();
        context.stroke();                   
    }    

    public shift (from_point: Point, to_point: Point) {
        this.from_point = shift(this.from_point, from_point, to_point);
        this.to_point = shift(this.to_point, from_point, to_point);
    }

    public exportToJson(): LineJSON {
        return {
            from_point: this.from_point,
            to_point: this.to_point,
            border_color: this.border_color,
        }
    }
}