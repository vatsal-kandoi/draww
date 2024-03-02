import { IAttributeOptions } from "../../../interfaces/attributeOptions";
import { CanvasActionType } from "../../../interfaces/enums";
import { IPoint } from "../../../interfaces";
import { EventBase, createEvent } from "../../events/structures/event";
import { ICanvasRefs } from "../canvas-base";
import { Line } from "../shapes/shape";
import { Square } from "../shapes/square";

class ShapeCaptureManager {
    private actionType: CanvasActionType;
    private attributes: IAttributeOptions;
    private shape: any = null;

    constructor(actionType: CanvasActionType, attributes: IAttributeOptions) {
        this.actionType = actionType;
        this.attributes = attributes;
    } 

    public renderLineOnCanvas(fromCoords: IPoint, toCoords: IPoint, canvasRefs: ICanvasRefs) {
        if (this.shape === null) {
            this.shape = [];
        }
        const line = new Line(fromCoords, toCoords, this.attributes.color, canvasRefs.captureDimentions())
        this.shape.push(line);
        canvasRefs.renderShapeOnCanvas(line);    
    }

    public renderSquareOnCanvas(fromCoords: IPoint, toCoords: IPoint, canvasRefs: ICanvasRefs) {
        this.shape = new Square(fromCoords, toCoords, this.attributes.color, canvasRefs.captureDimentions())
        canvasRefs.renderShapeOnLayer(this.shape);
    }

    public renderShapeOnCanvas(clickPosition: IPoint, fromCoords: IPoint, toCoords: IPoint, canvasRefs: ICanvasRefs | null) {
        if (canvasRefs === null) return;

        if (this.actionType === CanvasActionType.PEN) {
            this.renderLineOnCanvas(fromCoords, toCoords, canvasRefs)
            return;
        } 
        if (this.actionType === CanvasActionType.SQUARE) {
            this.renderSquareOnCanvas(clickPosition, toCoords, canvasRefs)
            return;
        }
        throw new Error("Unsupported action type selected blah");
    }

    public reset(): void {
        this.shape = null;
    }

    private captureShape(canvasRefs: ICanvasRefs) {
        if (this.shape === null) return null;

        if (this.actionType === CanvasActionType.PEN) {
            return this.shape as Line[];
        } 
        if (this.actionType === CanvasActionType.SQUARE) {
            canvasRefs.clearLayer();
            // Render on final canvas
            canvasRefs.renderShapeOnCanvas(this.shape);
            return this.shape as Square;
        }
        throw new Error("Unsupported action type selected");
    }

    public createEvent(user_name: string, canvasRefs: ICanvasRefs | null): EventBase | null {        
        if (canvasRefs === null) return null;

        const shape = this.captureShape(canvasRefs);
        if (shape === null) return null;

        return createEvent(this.actionType, user_name, shape);
    }
}

export default ShapeCaptureManager;