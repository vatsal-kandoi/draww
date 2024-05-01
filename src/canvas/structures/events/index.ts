import { IUserEvent, IUserEventJSON, IUserPenJSON, IUserSquareJSON, Shapes } from "../../../interfaces";
import { UserPenEvent } from "./pen";
import { UserSquareEvent } from "./square";

export default function convertToUserEvent(eventJSON: IUserEventJSON): IUserEvent {
    switch (eventJSON.type) {
        case (Shapes.PEN): {
            return UserPenEvent.fromJson(eventJSON as IUserPenJSON);
        }
        case (Shapes.SQUARE): {
            return UserSquareEvent.fromJson(eventJSON as IUserSquareJSON);
        }
        default: {
            throw new Error("Unsupported type")
        }
    }
}