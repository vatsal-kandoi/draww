import { Point } from "../../../structures";
import { IUserCanvasActionBase } from "../base";

export interface IUserCanvasActionInitializeCanvas extends IUserCanvasActionBase {
    /** Offscren canvas instance of the HTML canvas being sent to the worker */
    canvas: OffscreenCanvas;
    /** Dimensions of the onscreen canvas */
    dimensions: Point,
}

export interface IUserCanvasActionInitializeLayer extends IUserCanvasActionInitializeCanvas {}