import { Point } from "../base";

export interface IShapeBase {
    exportToJson: () => IShapeJSONBase;
    render: (context: OffscreenCanvasRenderingContext2D, capture_canvas_dimensions: Point, current_canvas_dimensions: Point) => void;
}

export interface IShapeJSONBase {}

export enum ShapeTypes {
    NONE = "NONE",
    LINE = "LINE",
}