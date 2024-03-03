import { IPoint } from "../../../interfaces";

class ShapeBase {

    protected captureDimensions: IPoint

    constructor(captureDimensions: IPoint) {
        this.captureDimensions = captureDimensions;
    }

    /**
     * Render the shape onto the canvas
     * @param contextAPI Context API for canvas
     */
    public render(contextAPI: CanvasRenderingContext2D, currentDimensions: IPoint) {
        throw new Error("Not implemented by the class");
    }

    /**
     * Export the shape as a json to be downloaded by the user
     */
    public exportToJson() {
        throw new Error("Not implemented by the class");
    }

    public hasOverlapWithCoordinates(coords: IPoint) {
        throw new Error("Not implemented");
    }
}

export { ShapeBase }; 