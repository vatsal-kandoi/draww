import { ICanvasUserEventProperties, IUserEvent, Point, Shapes } from "../../interfaces";
import { ShapeCaptureManagerBase } from "./shapes/base";
import { PenCaptureManager } from "./shapes/pen";
import { SquareCaptureManager } from "./shapes/square";

export class CaptureManager extends ShapeCaptureManagerBase {

    shape: Shapes = Shapes.NONE;
    /** Currently active manager capturing the shape */
    active_manager: ShapeCaptureManagerBase | null = null;

    /** Change whether the selection is enabled or not based on shape type */
    public isEnabled(): boolean {
        return this.shape !== Shapes.NONE;
    }
    
    /**
    * Handle changes to the selected shape
    * @param shape 
    */
    public onCanvasSelectedShapeChange(shape: Shapes): void {
        this.shape = shape;
        this.setActiveCaptureManager(shape);
        this.reset();
    }

    public reset(): void {

    }

    /** Handle changes made to the drawing properties */
    public onCanvasDrawingPropertiesChange(properties: ICanvasUserEventProperties) {
        this.properties = properties;

        if (this.active_manager !== null)
            this.active_manager.onCanvasDrawingPropertiesChange(properties);
    }

    /**
     * Handle movements of mouse, and render accordingly
     * @param point Cursor on point
     * @param is_mouse_down Whether mouse is clicked
     */
    public onMouseMovement(point: Point, is_mouse_down: boolean): IUserEvent | null {
        if (this.active_manager === null) return null;
        return this.active_manager.onMouseMovement(point, is_mouse_down);
    }

    private setActiveCaptureManager(shape: Shapes){ 
        switch(shape) {
            case (Shapes.PEN): {
                this.active_manager = new PenCaptureManager();
                this.active_manager.onCanvasDrawingPropertiesChange(this.properties);

                break;
            }
            case (Shapes.SQUARE): {
                this.active_manager = new SquareCaptureManager();
                this.active_manager.onCanvasDrawingPropertiesChange(this.properties);

                break;
            }
            default: {
                this.active_manager = null;
            }
        }
    }
}