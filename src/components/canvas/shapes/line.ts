import { ShapeBase } from "./base";
import { IPoint } from "../../../interfaces/shapes";
import { Shape } from "../../../interfaces/enums";


class Line extends ShapeBase {

    private fromCoords: IPoint;
    private toCoords: IPoint;
    private color: string;
    public type: Shape = Shape.LINE;

    constructor(fromCoords: IPoint, toCoords: IPoint, color: string) {
        super();
        this.fromCoords = fromCoords;
        this.toCoords = toCoords;
        this.color = color;
    }

    public render(contextAPI: CanvasRenderingContext2D) {
        contextAPI.strokeStyle = this.color;
        contextAPI.beginPath();
        contextAPI.moveTo(this.fromCoords.x, this.fromCoords.y);
        contextAPI.lineTo(this.toCoords.x, this.toCoords.y);
        contextAPI.closePath();
        contextAPI.stroke();                   
    }

    public exportToJson() {
        return {
            type: this.type,
            color: this.color,
            fromCoords: this.fromCoords,
            toCoords: this.toCoords
        }
    }
}

export { Line }; 