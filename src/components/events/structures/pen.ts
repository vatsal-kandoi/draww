import { CanvasActionType } from "../../../interfaces/enums";
import { IPoint } from "../../../interfaces/shapes";
import { Line } from "../../canvas/shapes/shape";
import { EventBase } from "./base";

class PenEvent extends EventBase {

    public type: CanvasActionType = CanvasActionType.PEN;

    constructor(user_name: string, shape: Line[]) {
        super(user_name, `created ${shape.length} lines`, shape);
    }

    public exportToJson() {
        return {
            user_name: this.user_name,
            type: this.type,
            shape: (this.shape as Line[]).map((shape) => shape.exportToJson()),
        }
    }

    public render(contextAPI: CanvasRenderingContext2D, currentDimensions: IPoint) {
        (this.shape as Line[]).forEach((shape) => {
            shape.render(contextAPI, currentDimensions);
        })
    }
}

export { 
    PenEvent
}; 