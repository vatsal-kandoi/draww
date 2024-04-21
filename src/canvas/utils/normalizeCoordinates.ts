import { Point } from "../../interfaces";

export function normalizeCoordinates(coords: Point, currentDimensions: Point, captureDimensions: Point): Point {
    if (currentDimensions === captureDimensions) return coords;    

    return {
        x: ( coords.x / captureDimensions.x ) * currentDimensions.x,
        y: ( coords.y / captureDimensions.y ) * currentDimensions.y
    }
}
