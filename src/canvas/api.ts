import { EventJSONBase, IInitCanvas, IInitTemporaryCanvas, IInitUser, IMouseMoveEvent, INewEvent, IProperties, IPropertiesChange, IShapeChange, IThemeProperties, Point, ShapeTypes, UserAction } from "../interfaces";

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

    public initialiseUser(user_name: string): void {
        if (window.Worker) {
            this.worker.postMessage({
                action: UserAction.INIT_USER,
                user_name: user_name,
            } as IInitUser)
        }
    }

    public initialiseCanvas(canvas: OffscreenCanvas, dimensions: Point ): void {
        if (window.Worker) {
            this.worker.postMessage({
                action: UserAction.INIT_CANVAS,
                canvas: canvas,
                dimensions: dimensions,
            } as IInitCanvas, [canvas]);
        }
    }

    public initialiseTemporaryCanvas(canvas: OffscreenCanvas, dimensions: Point ): void {
        if (window.Worker) {
            this.worker.postMessage({
                action: UserAction.INIT_TEMPORARY_CANVAS,
                canvas: canvas,
                dimensions: dimensions,
            } as IInitTemporaryCanvas, [canvas]);
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

    public setupNewEventListener(cb: (eventJSON: EventJSONBase) => void) {
        if (window.Worker) {
            this.worker.onmessage = (ev: MessageEvent) => {
                cb((ev.data as INewEvent).event);
            };
        }
    }

    public sendPropertiesChange(properties: IProperties) {
        if (window.Worker) {
            this.worker.postMessage({
                action: UserAction.PROPERTIES_CHANGE,
                ...properties
            } as IPropertiesChange);
        }
    }

    public onThemeChange(themeProperties: IThemeProperties) {
        if (window.Worker) {
            this.worker.postMessage({
                action: UserAction.THEME_CHANGE,
                ...themeProperties
            } as IThemeProperties);
        }
    }
}