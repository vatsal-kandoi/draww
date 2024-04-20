import { IPenEvent, PenJSON, Point } from "../../interfaces";
import { Line } from "../structures/line";
import { EventBase } from "./base";

export class PenEvent extends EventBase implements IPenEvent {
    shape: Line[];

    constructor(capture_canvas_dimensions: Point, current_canvas_dimensions: Point, user_name: string, description: string, shape: Line[]) {
        super(capture_canvas_dimensions, current_canvas_dimensions, user_name, description);
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
            event_name: this.event_name,
            user_name: this.user_name,
            description: this.description,
            capture_canvas_dimensions: this.capture_canvas_dimensions,
            current_canvas_dimensions: this.current_canvas_dimensions,
            shape: this.shape.map(line => line.exportToJson())
        }
    }
}