import { Point } from "../base";
import { IShapeJSONBase, ShapeTypes } from "../shapes/base";

export interface EventJSONBase {
    type: ShapeTypes,
    event_name: string;
    user_name: string;
    description: string;
    shape: IShapeJSONBase;
    capture_canvas_dimensions: Point,
    current_canvas_dimensions: Point,
}

export interface IEventBase {
    type: ShapeTypes;
    event_name: string;
    user_name: string;
    description: string;
    capture_canvas_dimensions: Point;
    current_canvas_dimensions: Point;

    isEqual: (other: IEventBase) => boolean;
    render: (context: OffscreenCanvasRenderingContext2D) => void;
    select: (context: OffscreenCanvasRenderingContext2D) => void;
    exportToJson: () => EventJSONBase;
}
