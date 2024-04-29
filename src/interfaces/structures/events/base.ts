import { Point } from "../base/point";
import { IShape, IShapeJSON, Shapes } from "../shapes/base";

export interface IUserEventJSON {
    /** Types of shapes captured by the event */
    type: Shapes;
    /** Name given to the event. Acts as a unique identifier */
    event_name: string;
    /** User name of person creating the event */
    user_name: string;
    /** Shape(s) contained by the event */
    shape: IShapeJSON;
    /** Dimensions of canvas where the shape was captured */
    capture_canvas_dimensions: Point,
}

export interface IUserEvent {
    /** Types of shapes captured by the event */
    type: Shapes;
    /** Name given to the event. Acts as a unique identifier */
    event_name: string;
    /** User name of person creating the event */
    user_name: string;
    /** Shape(s) contained by the event */
    shape: IShape | IShape[];
    /** Dimensions of canvas where the shape was captured */
    capture_canvas_dimensions: Point,

    /**
     * Compare if the event equals to another by checking the event name
     * @param other Second event to be compared against
     * @returns True if the event matches
     */
    isEqual: (other: IUserEvent) => boolean;
    /**
     * Render the event onto the canvas
     * @param context HTML Canvas 2D context
     * @param current_canvas_dimensions Current canvas dimensions, used to normalize the points
     */
    render: (context: OffscreenCanvasRenderingContext2D, current_canvas_dimensions: Point) => void;
    /**
     * Indicate the event as selected by rendering a selection box outside the shapes covered by the event
     * @param context HTML Canvas 2D context
     * @param current_canvas_dimensions Current canvas dimensions, used to normalize the points
     * @param select_outline_color Color for the outline
     */
    select: (context: OffscreenCanvasRenderingContext2D, current_canvas_dimensions: Point, select_outline_color: string) => void;
    /**
     * Export the event as a JSON to be serialized
     * @returns Event JSON
     */
    exportToJson: () => IUserEventJSON;
    /**
     * Validate whether the selected point is stored by the bounding box of the event
     * @param point Selected point
     * @returns True if it is inside the bounding box
     */
    containsPoint: (point: Point) => boolean;
    /**
     * Shift the current event to a new position based on the previous click & new click position ( drags )
     * @param from_point Previous click position
     * @param to_point New click position
     */
    shift: (from_point: Point, to_point: Point) => void;
}
