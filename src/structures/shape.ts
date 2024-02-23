import { Shape } from "../interfaces/enums";
import { IPoint } from "../interfaces/shapes";

class Line {

    private fromCoords: IPoint;
    private toCoords: IPoint;
    private color: string;
    public type: Shape = Shape.LINE;

    constructor(fromCoords: IPoint, toCoords: IPoint, color: string) {
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

const createShapeFromJSON = (shapeJson: any): any => {
    if (shapeJson.type === Shape.LINE) 
        return new Line(
            shapeJson.fromCoords as IPoint, 
            shapeJson.toCoords as IPoint,
            shapeJson.color as string,
        )
}


export { createShapeFromJSON, Line }; 