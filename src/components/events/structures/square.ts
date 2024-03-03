import { CanvasActionType } from "../../../interfaces/enums";
import { IPoint } from "../../../interfaces";
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

    protected captureCoordinatesForBox(): {fromCoords: IPoint; toCoords: IPoint } {
        let fromCoords = {x: -1, y: -1};
        let toCoords = {x: -1, y: -1};

        if (this.shape.fromCoords.x > this.shape.toCoords.x) { 
            fromCoords.x = this.shape.toCoords.x - 10
            toCoords.x = this.shape.fromCoords.x + 10
        } else {
            fromCoords.x = this.shape.fromCoords.x - 10
            toCoords.x = this.shape.toCoords.x + 10
        }
        if (this.shape.fromCoords.y > this.shape.toCoords.y) { 
            fromCoords.y = this.shape.toCoords.y + 10
            toCoords.y = this.shape.fromCoords.y - 10
        } else {
            toCoords.y = this.shape.toCoords.y + 10
            fromCoords.y = this.shape.fromCoords.y - 10
        }

        return {fromCoords, toCoords};
    }

    public hasOverlapWithCoordinates(coords: IPoint) {
        return this.shape.hasOverlapWithCoordinates(coords);
    }

}

export { 
    SquareEvent
}; 