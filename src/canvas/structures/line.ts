import { ILine, LineJSON, Point } from "../../interfaces";
import { normalizeCoordinates } from "../utils";
import { ShapeBase } from "./base";

export class Line extends ShapeBase implements ILine {
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

        context.beginPath();
        context.moveTo(fromCoords.x, fromCoords.y);
        context.lineTo(toCoords.x, toCoords.y);
        context.closePath();
        context.stroke();                   
    }    

    public exportToJson(): LineJSON {
        return {
            from_point: this.from_point,
            to_point: this.to_point,
        }
    }
}