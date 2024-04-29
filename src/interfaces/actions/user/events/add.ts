
import { IUserEventJSON } from "../../../structures";
import { IUserCanvasActionBase } from "../base";

export interface IUserCanvasActionEventAdded extends IUserCanvasActionBase {
    /** JSON for added event */
    event: IUserEventJSON
}