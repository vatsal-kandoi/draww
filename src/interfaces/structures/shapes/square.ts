import { Point } from "../base/point";
import { IShape, IShapeJSON } from "./base";

export interface ISquare extends IShape {
    /** Starting point of the square */
    from_point: Point;
    /** Ending point ( diagonally opposite ) point of the square */
    to_point: Point;
    /** Stroke color */
    border_color: string;

    /** Export the square into a serializable JSON with all attributes */
    exportToJson: () => ISquareJSON;
}

export interface ISquareJSON extends IShapeJSON {
    /** Starting point of the square */
    from_point: Point;
    /** Ending point ( diagonally opposite ) point of the square */
    to_point: Point;
    /** Stroke color */
    border_color: string;
}