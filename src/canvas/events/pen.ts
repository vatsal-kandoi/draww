import { IPenEvent, PenJSON, Point, ShapeTypes } from "../../interfaces";
import { Line } from "../structures/line";
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

    public select(contextAPI: OffscreenCanvasRenderingContext2D) {
        throw new Error("Not implemented");
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

export default function capturePenEvent(
    user_name: string,
    shape: Line[],
    dimensions: Point,
): PenEvent {
    const event = new PenEvent(dimensions, dimensions, user_name, shape);
    return event;
}