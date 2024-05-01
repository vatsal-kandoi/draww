import { Palette } from "@mui/material";
import { ICanvasUserEventProperties, IUserCanvasActionEventAdded, Point, Shapes, UserCanvasActionType, IUserCanvasActionInitializeUser, IUserCanvasActionInitializeCanvas, IUserCanvasActionInitializeLayer, IUserCanvasActionPropertiesChange, IUserCanvasActionShapeChange, IUserCanvasActionMouseMovement, IUserCanvasActionThemeBasedPropertiesChange } from "../interfaces";

export function setupCanvasRenderer(): CanvasInterface {
    const worker: Worker = new Worker(
        new URL(`./worker.ts`, import.meta.url)
    )
    const api = new CanvasInterface(worker);
    return api;
}

export class CanvasInterface {
    
    /** 
     * Web worker to postMessage to & set-up message handlers
     */
    worker: Worker;

    constructor(worker: Worker) {
        this.worker = worker;
    }

    /**
     * Terminate the web workers on component unmount
     */
    public cleanup() {
        this.worker.terminate();
    }

    /**
     * Initiliase the user on the remote worker
     * @param user_name 
     */
    public initializeUser(user_name: string) {
        if (window.Worker) {
            this.worker.postMessage({
                type: UserCanvasActionType.CANVAS_INITIALIZE_USER,
                user_name: user_name,
            } as IUserCanvasActionInitializeUser)
        }
    }

    /**
     * Initialize the main canvas on the remote worker by transferring control off scren
     * @param canvas HTML Canvas
     * @param dimensions Dimensions for the canvas
     */
    public initializeCanvas(canvas: HTMLCanvasElement, dimensions: Point) {
        if (window.Worker) {
            const offscreen = canvas.transferControlToOffscreen();
            this.worker.postMessage({
                type: UserCanvasActionType.CANVAS_INITIALIZE_MAIN_CANVAS,
                dimensions: dimensions,
                canvas: offscreen,
            } as IUserCanvasActionInitializeCanvas, [offscreen])

        }
    }

    /**
     * Initialize the layer for rendering temporary content such as moves. Dimension remain same as main canvas
     * @param canvas HTML Canvas
     */
    public initializeLayer(canvas: HTMLCanvasElement) {
        if (window.Worker) {
            const offscreen = canvas.transferControlToOffscreen();
            this.worker.postMessage({
                type: UserCanvasActionType.CANVAS_INITIALIZE_TEMPORARY_LAYER,
                canvas: offscreen,
            } as IUserCanvasActionInitializeLayer, [offscreen])
        }
    }


    /**
     * Send the change in drawing propties to the worker
     * @param properties Drawing properties chosen by user
     */
    public onCanvasDrawingPropertiesChange(properties: ICanvasUserEventProperties): void {
        if (window.Worker) {
            this.worker.postMessage({
                type: UserCanvasActionType.CANVAS_CHANGE_DRAWING_PROPERTIES,
                properties,
            } as IUserCanvasActionPropertiesChange)
        }
    }

    /**
     * Send the change in selected shape to the worker
     * @param shape Select shape
     */
    public onCanvasSelectedShapeChange(shape: Shapes): void {
        if (window.Worker) {
            this.worker.postMessage({
                type: UserCanvasActionType.CANVAS_CHANGE_SELECTED_SHAPE,
                shape,
            } as IUserCanvasActionShapeChange)
        }
    }

    /**
     * Send the current location to the worker
     * @param point Current location
     * @param is_mouse_down whether the mouse is pressed or not
     */
    public onMouseMovementOnCanvas(point: Point, is_mouse_down: boolean): void {
        if (window.Worker) {
            this.worker.postMessage({
                type: UserCanvasActionType.CANVAS_CHANGE_MOUSE_POSITION,
                point,
                is_mouse_down
            } as IUserCanvasActionMouseMovement)
        }
    }

    /**
     * Send theme based properties such as select outline color to the worker
     * @param properties Drawing properties chosen by user
     */
    public onCanvasThemeBasedPropertiesChange(palette: Palette): void {
        const select_outline_color = palette.text.secondary;
        if (window.Worker) {
            this.worker.postMessage({
                type: UserCanvasActionType.CANVAS_CHANGE_THEME_BASED_PROPERTIES,
                properties: {
                    select_outline_color: select_outline_color,
                }
            } as IUserCanvasActionThemeBasedPropertiesChange)
        }
    }

    /**
     * Srt-up a callback to be called whenever a new event is added to the canvas
     * @param cb Callback to be called when a new event is added 
     */
    public setupCanvasUserEventAddListener(cb: (data: IUserCanvasActionEventAdded) => void) {
        this.worker.onmessage = (ev: MessageEvent)  => {
            cb(ev.data);
        }
    }
}