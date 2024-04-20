import { IInitializeCanvas, IMouseMoveEvent, IShapeChange, IUserSet, Point, ShapeTypes, UserAction } from "../interfaces";

export function setupCanvasRenderer(): CanvasManagerInterface {
    const worker: Worker = new Worker(
        new URL(`./worker.ts`, import.meta.url)
    )
    const api = new CanvasManagerInterface(worker);
    return api;
}

export class CanvasManagerInterface {

    worker: Worker

    constructor(worker: Worker) {
        this.worker = worker;
    }

    public cleanup() {
        this.worker.terminate();

    }

    public setUser(user_name: string): void {
        if (window.Worker) {
            this.worker.postMessage({
                action: UserAction.SET_USER,
                user_name: user_name,
            } as IUserSet)
        }
    }

    public setCanvas(canvas: OffscreenCanvas, dimensions: Point ): void {
        if (window.Worker) {
            this.worker.postMessage({
                action: UserAction.SET_CANVAS,
                canvas: canvas,
                dimensions: dimensions,
            } as IInitializeCanvas, [canvas]);
        }
    }

    public sendShapeSelectionChange(shape: ShapeTypes): void {
        if (window.Worker) {
            this.worker.postMessage({
                action: UserAction.SHAPE_CHANGE,
                shape: shape,
            } as IShapeChange)
        }
    }

    public sendMouseCoordinates(point: Point, isMouseDown: boolean) {
        if (window.Worker) {
            this.worker.postMessage({
                action: UserAction.MOUSE_MOVE_EVENT,
                point: point,
                isMouseDown: isMouseDown
            } as IMouseMoveEvent);
        }
    }
}