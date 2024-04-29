import { LineJSON } from "../shapes/line";
import { IEventBase, EventJSONBase } from "./base";

export interface PenJSON extends EventJSONBase {
    shape: LineJSON[];
}

export interface IPenEvent extends IEventBase {
    exportToJson: () => PenJSON;
}