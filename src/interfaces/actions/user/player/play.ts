import { IUserEventJSON } from "../../../structures";
import { IUserCanvasActionBase } from "../base";

export interface IUserPlayerActionRenderEvent extends IUserCanvasActionBase {
    /** Render the event onto the canvas in playerm mode */
    event: IUserEventJSON;
}
