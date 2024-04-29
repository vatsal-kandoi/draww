import { IPenEvent, PenJSON, Point, ShapeTypes } from "../../interfaces";
import { Line } from "../structures/line";
import { normalizeCoordinates } from "../utils";
import { EventBase } from "./base";

export class PenEvent extends EventBase implements IPenEvent {
    public type: ShapeTypes = ShapeTypes.LINE;    
    shape: Line[];

    constructor(capture_canvas_dimensions: Point, current_canvas_dimensions: Point, user_name: string, shape: Line[]) {
        super(capture_canvas_dimensions, current_canvas_dimensions, user_name);
        this.shape = shape;
    }

    public render(contextAPI: OffscreenCanvasRenderingContext2D) {
        this.shape.forEach(line => line.render(contextAPI, this.capture_canvas_dimensions, this.current_canvas_dimensions));
    }

    private getPoint(axis: "x" | "y", existing: Point, candidate: Point, func: any ): number {
        if (existing[axis] === -1) return candidate[axis];
        return func(existing[axis], candidate[axis]);
    }

    private getBoundingRect(): { from_point: Point, to_point: Point } {
        const from_point = { x: -1, y: -1 };
        const to_point = { x: -1, y: -1 };

        this.shape.forEach((line) => {
            from_point.x = this.getPoint("x", from_point, line.from_point, Math.min);
            from_point.y = this.getPoint("y", from_point, line.from_point, Math.min);
            from_point.x = this.getPoint("x", from_point, line.to_point, Math.min);
            from_point.y = this.getPoint("y", from_point, line.to_point, Math.min);
            
            to_point.x = this.getPoint("x", to_point, line.from_point, Math.max);
            to_point.y = this.getPoint("y", to_point, line.from_point, Math.max);
            to_point.x = this.getPoint("x", to_point, line.to_point, Math.max);
            to_point.y = this.getPoint("y", to_point, line.to_point, Math.max);
        });

        return { from_point, to_point };
    }

    public containsPoint(point: Point): boolean {
        const {from_point, to_point} = this.getBoundingRect();

        return (point.x >= from_point.x && point.y >= from_point.y && point.x <= to_point.x && point.y <= to_point.y);
    }

    public select(contextAPI: OffscreenCanvasRenderingContext2D, color: string) {        
        const {from_point, to_point} = this.getBoundingRect();

        const fromCoords = normalizeCoordinates(from_point, this.current_canvas_dimensions, this.capture_canvas_dimensions);
        const toCoords = normalizeCoordinates(to_point, this.current_canvas_dimensions, this.capture_canvas_dimensions);  

        fromCoords.x = fromCoords.x - 10;
        fromCoords.y = fromCoords.y - 10;
        toCoords.x = toCoords.x + 10;
        toCoords.y = toCoords.y + 10;

        this.render(contextAPI);

        contextAPI.setLineDash([6]);
        contextAPI.strokeStyle = color;
        contextAPI.strokeRect(
            fromCoords.x, 
            fromCoords.y, 
            (toCoords.x - fromCoords.x),
            (toCoords.y - fromCoords.y)
        ); 
        contextAPI.setLineDash([0]);
    }

    public shift (from_point: Point, to_point: Point) {
        this.shape.forEach((line) => {
            line.shift(from_point, to_point);
        })
    }

    public exportToJson(): PenJSON {
        return {
            type: this.type,
            event_name: this.event_name,
            user_name: this.user_name,
            capture_canvas_dimensions: this.capture_canvas_dimensions,
            current_canvas_dimensions: this.current_canvas_dimensions,
            shape: this.shape.map(line => line.exportToJson())
        }
    }
}
