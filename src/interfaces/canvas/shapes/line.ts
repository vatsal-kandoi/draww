import { Point } from "../base";
import { IShapeBase, IShapeJSONBase } from "./base";

export interface ILine extends IShapeBase {
    from_point: Point;
    to_point: Point;

    exportToJson: () => LineJSON;
}

export interface LineJSON extends IShapeJSONBase {
    from_point: Point;
    to_point: Point;
}