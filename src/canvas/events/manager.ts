import { ShapeTypes } from "../../interfaces";
import { ShapeManager } from "../structures/manager";
import { EventBase } from "./base";
import capturePenEvent from "./pen";

export class EventManager {
 
    user_name: string | null =  null;

    public isInitialised(): boolean {
        return this.user_name !== null;
    }

    public initialise(user_name: string) {
        this.user_name = user_name;
    }

    public createEvent(shapeManager: ShapeManager): EventBase | null {
        if (this.user_name === null) return null;

        switch (shapeManager.active_shape) {
            case ShapeTypes.LINE: {
                return capturePenEvent(this.user_name, shapeManager.shape, shapeManager.current_canvas_dimensions);
            }
        }
        return null;
    }
}