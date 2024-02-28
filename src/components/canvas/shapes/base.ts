class ShapeBase {

    /**
     * Render the shape onto the canvas
     * @param contextAPI Context API for canvas
     */
    public render(contextAPI: CanvasRenderingContext2D) {
        throw new Error("Not implemented by the class");
    }

    /**
     * Export the shape as a json to be downloaded by the user
     */
    public exportToJson() {
        throw new Error("Not implemented by the class");
    }
}

export { ShapeBase }; 