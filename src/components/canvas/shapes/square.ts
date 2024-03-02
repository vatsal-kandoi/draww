import { ShapeBase } from "./base";
import { IPoint } from "../../../interfaces";
import { Shape } from "../../../interfaces/enums";
import { normalizeCoordinates } from "../../utils";


class Square extends ShapeBase {

    private fromCoords: IPoint;
    private toCoords: IPoint;
    private color: string;
    public type: Shape = Shape.SQUARE;

    constructor(fromCoords: IPoint, toCoords: IPoint, color: string, captureDimensions: IPoint) {
        super(captureDimensions);
        this.fromCoords = fromCoords;
        this.toCoords = toCoords;
        this.color = color;
    }

    public render(contextAPI: CanvasRenderingContext2D, currentDimensions: IPoint) {
        const fromCoords = normalizeCoordinates(this.fromCoords, currentDimensions, this.captureDimensions);
        const toCoords = normalizeCoordinates(this.toCoords, currentDimensions, this.captureDimensions);
        contextAPI.strokeStyle = this.color;
        contextAPI.strokeRect(
            fromCoords.x, 
            fromCoords.y, 
            (toCoords.x - fromCoords.x),
            (toCoords.y - fromCoords.y)
        );                   
    }

    public exportToJson() {
        return {
            type: this.type,
            color: this.color,
            fromCoords: this.fromCoords,
            toCoords: this.toCoords,
            dimensions: this.captureDimensions,
        }
    }
}

export { Square }; 