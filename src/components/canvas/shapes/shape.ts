import { Shape } from "../../../interfaces/enums";
import { IPoint } from "../../../interfaces";
import { Line } from "./line";
import { ShapeBase } from "./base";
import { Square } from "./square";

/**
 * Conver the JSON into a shape object based on the 
 * @param shapeJson JSON passed in by the user for the given shape
 * @returns ShapeBase 
 */
const createShapeFromJSON = (shapeJson: any): ShapeBase => {
    if (shapeJson.type === Shape.LINE) {
        return new Line(
            shapeJson.fromCoords as IPoint, 
            shapeJson.toCoords as IPoint,
            shapeJson.color as string,
            shapeJson.dimensions as IPoint,
        )
    }
    if (shapeJson.type === Shape.SQUARE) {
        return new Square(
            shapeJson.fromCoords as IPoint, 
            shapeJson.toCoords as IPoint,
            shapeJson.color as string,
            shapeJson.dimensions as IPoint,
        )
    }   
    throw new Error("Unrecognized type passed in for a shape type")
}

export { 
    createShapeFromJSON, 
    ShapeBase, 
    Line,
    Square 
}; 
