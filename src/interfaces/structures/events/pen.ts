import { ILine, ILineJSON } from "../shapes/line";
import { IUserEvent, IUserEventJSON } from "./base";

export interface IUserPenJSON extends IUserEventJSON {
    /** Defines the shape contained by the event */
    shape: ILineJSON[];
}

export interface IUserPenEvent extends IUserEvent {
    /** Shape defined by the event */
    shape: ILine[];    
    /**
     * Export the event as a JSON to be serialized
     * @returns Pen event JSON
     */
    exportToJson: () => IUserPenJSON;
}