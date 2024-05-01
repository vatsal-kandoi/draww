import { DEFAULT_CANVAS_PROPERTIES, ICanvasUserEventProperties, IUserEvent, Point } from "../../../interfaces";

export class ShapeCaptureManagerBase {
    properties: ICanvasUserEventProperties = DEFAULT_CANVAS_PROPERTIES;

    /** Handle changes made to the drawing properties */
    public onCanvasDrawingPropertiesChange(properties: ICanvasUserEventProperties) {
        this.properties = properties;
    }

    /**
     * Handle movements of mouse, and render accordingly
     * @param point Cursor on point
     * @param is_mouse_down Whether mouse is clicked
     */
    public onMouseMovement(point: Point, is_mouse_down: boolean): IUserEvent | null {
        throw new Error("Not implemented")
    }

}