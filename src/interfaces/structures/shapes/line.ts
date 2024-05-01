import { StrokeStyles } from "../../canvas/properties/stroke";
import { Point } from "../base/point";
import { IShape, IShapeJSON } from "./base";

export interface ILine extends IShape {
    /** Starting point of the line */
    from_point: Point;
    /** Ending point of the line */
    to_point: Point;
    /** Stroke color of the line */
    border_color: string;

    /** Export the line into a serializable JSON with all attributes */
    exportToJson: () => ILineJSON;
}

export interface ILineJSON extends IShapeJSON {
    /** Starting point of the line */
    from_point: Point;
    /** Ending point of the line */
    to_point: Point;
    /** Stroke color of the line */
    border_color: string;
}