import { Shape } from "../../../interfaces/enums";
import { IPoint } from "../../../interfaces/shapes";
import { Line } from "./line";
import { ShapeBase } from "./base";

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
        )
    }
    throw new Error("Unrecognized type passed in for a shape type")
}

export { 
    createShapeFromJSON, 
    ShapeBase, 
    Line 
}; 
