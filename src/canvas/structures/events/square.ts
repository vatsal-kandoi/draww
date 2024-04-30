import { ISquare, IUserSquareEvent, IUserSquareJSON, Point, Shapes } from "../../../interfaces";
import { normalizeCoordinates } from "../../../utils";
import { UserEventBase } from "./base";

/** Defines the class for the sqaure draw event by the yser*/
export class UserSquareEvent extends UserEventBase implements IUserSquareEvent {
    public type: Shapes = Shapes.SQUARE;    
    shape: ISquare;

    constructor(capture_canvas_dimensions: Point, user_name: string, shape: ISquare) {
        super(capture_canvas_dimensions, user_name, shape);
        this.shape = shape;
    }

    public render (context: OffscreenCanvasRenderingContext2D, current_canvas_dimensions: Point): void {
        this.shape.render(context, this.capture_canvas_dimensions, current_canvas_dimensions);
    }

    public containsPoint(point: Point): boolean {
        const {from_point, to_point} = this.getBoundingRect();

        return (point.x >= from_point.x && point.y >= from_point.y && point.x <= to_point.x && point.y <= to_point.y);
    }

    public select (context: OffscreenCanvasRenderingContext2D, current_canvas_dimensions: Point, select_outline_color: string): void {
        const {from_point, to_point} = this.getBoundingRect();

        const fromCoords = normalizeCoordinates(from_point, current_canvas_dimensions, this.capture_canvas_dimensions);
        const toCoords = normalizeCoordinates(to_point, current_canvas_dimensions, this.capture_canvas_dimensions);  

        fromCoords.x = fromCoords.x - 10;
        fromCoords.y = fromCoords.y - 10;
        toCoords.x = toCoords.x + 10;
        toCoords.y = toCoords.y + 10;

        this.render(context, current_canvas_dimensions);

        context.setLineDash([6]);
        context.strokeStyle = select_outline_color;
        context.strokeRect(
            fromCoords.x, 
            fromCoords.y, 
            (toCoords.x - fromCoords.x),
            (toCoords.y - fromCoords.y)
        ); 
        context.setLineDash([0]);
    }

    public shift(from_point: Point, to_point: Point) {
        this.shape.shift(from_point, to_point);
    }

    public exportToJson(): IUserSquareJSON {
        return {
            type: this.type,
            event_name: this.event_name,
            user_name: this.user_name,
            capture_canvas_dimensions: this.capture_canvas_dimensions,
            shape: this.shape.exportToJson(),
        }
    }


    /** Get the rectangle that encompasses the current swaure in the event */
    private getBoundingRect(): { from_point: Point, to_point: Point } {
        const from_point = { x: -1, y: -1 };
        const to_point = { x: -1, y: -1 };
        
        from_point.x = this.getAxisValue("x", from_point, this.shape.from_point, Math.min);
        from_point.y = this.getAxisValue("y", from_point, this.shape.from_point, Math.min);
        from_point.x = this.getAxisValue("x", from_point, this.shape.to_point, Math.min);
        from_point.y = this.getAxisValue("y", from_point, this.shape.to_point, Math.min);
            
        to_point.x = this.getAxisValue("x", to_point, this.shape.from_point, Math.max);
        to_point.y = this.getAxisValue("y", to_point, this.shape.from_point, Math.max);
        to_point.x = this.getAxisValue("x", to_point, this.shape.to_point, Math.max);
        to_point.y = this.getAxisValue("y", to_point, this.shape.to_point, Math.max);
        
        return { from_point, to_point };
    }
}
