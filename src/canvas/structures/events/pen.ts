import { ILine, IUserPenEvent, IUserPenJSON, Point, Shapes } from "../../../interfaces";
import { normalizeCoordinates } from "../../../utils";
import { Line } from "../shapes/line";
import { UserEventBase } from "./base";

/** Defines the class for the freeform pen draw event by the yser*/
export class UserPenEvent extends UserEventBase implements IUserPenEvent {
    public type: Shapes = Shapes.PEN;    
    shape: ILine[];    

    constructor(capture_canvas_dimensions: Point, user_name: string, shape: ILine[]) {
        super(capture_canvas_dimensions, user_name, shape);
        this.shape = shape;
    }
    
    public render (context: OffscreenCanvasRenderingContext2D, current_canvas_dimensions: Point): void {
        this.shape.forEach(line => line.render(context, this.capture_canvas_dimensions, current_canvas_dimensions));
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

    public shift (from_point: Point, to_point: Point) {
        this.shape.forEach((line) => {
            line.shift(from_point, to_point);
        })
    }

    public exportToJson(): IUserPenJSON {
        return {
            type: this.type,
            event_name: this.event_name,
            user_name: this.user_name,
            capture_canvas_dimensions: this.capture_canvas_dimensions,
            shape: this.shape.map(line => line.exportToJson())
        }
    }

    public static fromJson(data: IUserPenJSON): IUserPenEvent {        
        const event = new UserPenEvent(
            data.capture_canvas_dimensions,
            data.user_name,
            data.shape.map((shapeJson) => Line.fromJson(shapeJson))
        );
        event.event_name = data.event_name;
        return event;
    }

    /** Get the rectangle that encompasses the current set of lines in the event */
    private getBoundingRect(): { from_point: Point, to_point: Point } {
        const from_point = { x: -1, y: -1 };
        const to_point = { x: -1, y: -1 };

        this.shape.forEach((line) => {
            from_point.x = this.getAxisValue("x", from_point, line.from_point, Math.min);
            from_point.y = this.getAxisValue("y", from_point, line.from_point, Math.min);
            from_point.x = this.getAxisValue("x", from_point, line.to_point, Math.min);
            from_point.y = this.getAxisValue("y", from_point, line.to_point, Math.min);
            
            to_point.x = this.getAxisValue("x", to_point, line.from_point, Math.max);
            to_point.y = this.getAxisValue("y", to_point, line.from_point, Math.max);
            to_point.x = this.getAxisValue("x", to_point, line.to_point, Math.max);
            to_point.y = this.getAxisValue("y", to_point, line.to_point, Math.max);
        });

        return { from_point, to_point };
    }
}
