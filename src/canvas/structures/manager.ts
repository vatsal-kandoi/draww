import { Point, ShapeTypes } from "../../interfaces";
import { Line } from "./line";

export class ShapeManager {
    private active_shape: ShapeTypes = ShapeTypes.LINE;
    private shape: any;
    private last_coordinates: Point = {x: -1, y: -1};

    public setActiveShape(shapeType: ShapeTypes) {

    }

    public captureShape(context: OffscreenCanvasRenderingContext2D, current_position: Point, dimensions: Point) {
        if (this.last_coordinates.x === -1 &&  this.last_coordinates.y === -1) {
            this.last_coordinates = current_position;
            return;
        }
        console.log(current_position);

        const line = new Line(this.last_coordinates, current_position);
        line.render(context, dimensions, dimensions);
        this.last_coordinates = current_position;
        
    }

    public finalizeShape() {
        this.last_coordinates = {x: -1, y: -1};

    }
}