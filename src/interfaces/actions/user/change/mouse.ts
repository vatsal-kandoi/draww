import { Point } from "../../../structures";
import { IUserCanvasActionBase } from "../base";


export interface IUserCanvasActionMouseMovement extends IUserCanvasActionBase {
    /** Whether the mouse is clicked */
    is_mouse_down: boolean;
    /** Dimensions of the onscreen canvas */
    point: Point,
}
