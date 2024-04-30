import { ICanvasUserEventProperties, Point, Shapes } from "../interfaces";

export function setupCanvasRenderer(): CanvasInterface {
    // const worker: Worker = new Worker(
    //     new URL(`./worker.ts`, import.meta.url)
    // )
    const api = new CanvasInterface();
    return api;
}

export class CanvasInterface {
    
    /** 
     * Web worker to postMessage to & set-up message handlers
     */
    // worker: Worker;

    // constructor(worker: Worker) {
    //     this.worker = worker;
    // }

    /**
     * Terminate the web workers on component unmount
     */
    public cleanup() {
        // this.worker.terminate();
    }

    /**
     * Initiliase the user on the remote worker
     * @param user_name 
     */
    public initializeUser(user_name: string) {
    }

    /**
     * Initialize the main canvas on the remote worker by transferring control off scren
     * @param canvas HTML Canvas
     * @param dimensions Dimensions for the canvas
     */
    public initializeCanvas(canvas: HTMLCanvasElement, dimensions: Point) {

    }

    /**
     * Initialize the layer for rendering temporary content such as moves. Dimension remain same as main canvas
     * @param canvas HTML Canvas
     */
    public initializeLayer(canvas: HTMLCanvasElement) {

    }


    /**
     * Send the change in drawing propties to the worker
     * @param properties Drawing properties chosen by user
     */
    public onCanvasDrawingPropertiesChange(properties: ICanvasUserEventProperties): void {

    }

    /**
     * Send the change in selected shape to the worker
     * @param shape Select shape
     */
    public onCanvasSelectedShapeChange(shape: Shapes): void {

    }

    /**
     * Send the current location to the worker
     * @param point Current location
     * @param is_mouse_down whether the mouse is pressed or not
     */
    public onMouseMovementOnCanvas(point: Point, is_mouse_down: boolean): void {
    }


}