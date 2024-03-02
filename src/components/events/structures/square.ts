import { CanvasActionType } from "../../../interfaces/enums";
import { IPoint } from "../../../interfaces/shapes";
import { Square } from "../../canvas/shapes/shape";
import { EventBase } from "./base";

class SquareEvent extends EventBase {

    public type: CanvasActionType = CanvasActionType.SQUARE;

    constructor(user_name: string, shape: Square) {
        super(user_name, `created a square`, shape);
    }

    public exportToJson() {
        return {
            user_name: this.user_name,
            type: this.type,
            shape: this.shape.exportToJson(),
        }
    }

    public render(contextAPI: CanvasRenderingContext2D, currentDimensions: IPoint) {
        this.shape.render(contextAPI, currentDimensions);
    }
}

export { 
    SquareEvent
}; 