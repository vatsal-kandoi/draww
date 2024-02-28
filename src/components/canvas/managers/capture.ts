import { IAttributeOptions } from "../../../interfaces/attributeOptions";
import { CanvasActionType } from "../../../interfaces/enums";
import { IPoint } from "../../../interfaces/shapes";
import { EventBase, createEvent } from "../../events/structures/event";
import { Line, ShapeBase } from "../shapes/shape";

class ShapeCaptureManager {
    private actionType: CanvasActionType;
    private attributes: IAttributeOptions;
    private shape: any = null;

    constructor(actionType: CanvasActionType, attributes: IAttributeOptions) {
        this.actionType = actionType;
        this.attributes = attributes;
    }

    public captureLine(fromCoords: IPoint, toCoords: IPoint): Line {
        return new Line(fromCoords, toCoords, this.attributes.color)
    }

    public captureShape(fromCoords: IPoint, toCoords: IPoint): ShapeBase { 
        if (this.actionType === CanvasActionType.PEN) {
            if (this.shape === null) {
                this.shape = [];
            }
            const line = this.captureLine(fromCoords, toCoords)
            this.shape.push(line);

            return line
        }
        throw new Error("Unsupported action type selected");
    }

    public reset(): void {
        this.shape = null;
    }

    private getCapturedShape() {
        if (this.actionType === CanvasActionType.PEN) {
            return this.shape as Line[];
        }
        throw new Error("Unsupported action type selected");
    }

    public createEvent(user_name: string): EventBase | null {        
        const shape = this.getCapturedShape();
        if (shape === null) return null;
        return createEvent(this.actionType, user_name, shape);
    }
}

export default ShapeCaptureManager;