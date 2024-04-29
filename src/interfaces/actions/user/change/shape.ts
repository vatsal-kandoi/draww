import { Shapes } from "../../../structures";
import { IUserCanvasActionBase } from "../base";


export interface IUserCanvasActionShapeChange extends IUserCanvasActionBase {
    /** Shape selected by the user */
    shape: Shapes
}
