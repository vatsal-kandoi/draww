import { IUserEvent, IUserEventJSON } from "./base";
import { ISquare, ISquareJSON } from "../shapes/square";

export interface IUserSquareJSON extends IUserEventJSON {
    /** Defines the shape contained by the event */
    shape: ISquareJSON;
}

export interface IUserSquareEvent extends IUserEvent {
    /** Shape defined by the event */
    shape: ISquare;
    /**
     * Export the event as a JSON to be serialized
     * @returns Square event JSON
     */
    exportToJson: () => IUserSquareJSON;
}
