import { SquareShapeJSON } from "../shapes/square";
import { IEventBase, EventJSONBase } from "./base";

export interface SquareJSON extends EventJSONBase {
    shape: SquareShapeJSON
}

export interface ISquareEvent extends IEventBase {
    exportToJson: () => SquareJSON;
}