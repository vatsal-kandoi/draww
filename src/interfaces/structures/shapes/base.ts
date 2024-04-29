import { Point } from "../base/point";

/** Shapes that can be selected by the user */
export enum Shapes {
    NONE = "NONE",
    PEN = "PEN",
    SQUARE = "SQUARE",
}

export interface IShape {
    /** Export the shape to a JSON to be serialized & stored. Also can be downloaded by the user to be exported / sent to
     * external people
     */
    exportToJson: () => IShapeJSON;
    /**
     * Render the shape onto the HTML canvas
     * @param context HTML 2D context
     * @param capture_canvas_dimensions Dimensions in which shape was captured 
     * @param current_canvas_dimensions Dimensions of the current canvas. The shape is rendered in a normalized fashion
     */
    render: (context: OffscreenCanvasRenderingContext2D, capture_canvas_dimensions: Point, current_canvas_dimensions: Point) => void;
    /**
     * Shift the current shape to a new position based on the previous click & new click position ( drags )
     * @param from_point Previous click position
     * @param to_point New click position
     */
    shift: (from_point: Point, to_point: Point) => void;
}

export interface IShapeJSON { }

