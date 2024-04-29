import { Point } from "../base";
import { IShapeBase, IShapeJSONBase } from "./base";

export interface ISquare extends IShapeBase {
    from_point: Point;
    to_point: Point;

    exportToJson: () => SquareShapeJSON;
}

export interface SquareShapeJSON extends IShapeJSONBase {
    from_point: Point;
    to_point: Point;
}