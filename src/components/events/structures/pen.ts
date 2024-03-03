import { CanvasActionType } from "../../../interfaces/enums";
import { IPoint } from "../../../interfaces";
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

    protected captureCoordinatesForBox(): {fromCoords: IPoint; toCoords: IPoint } {
        const xAxis: number[] = [];
        const yAxis: number[] = [];
        (this.shape as Line[]).forEach((line) => {
            xAxis.push(line.fromCoords.x);
            xAxis.push(line.toCoords.x);
            yAxis.push(line.fromCoords.y);
            yAxis.push(line.toCoords.y);
        });

        return { 
            fromCoords: {
                x: Math.min(...xAxis) - 10,
                y: Math.min(...yAxis) - 10,
            }, 
            toCoords: {
                x: Math.max(...xAxis) + 10,
                y: Math.max(...yAxis) + 10,                
            }
        }
    }

    public hasOverlapWithCoordinates(coords: IPoint) {
        return (this.shape as Line[]).some((shape) => shape.hasOverlapWithCoordinates(coords));
    }
}

export { 
    PenEvent
}; 