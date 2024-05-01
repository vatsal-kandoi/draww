import { IUserCanvasActionInitializeCanvas, IUserCanvasActionInitializeLayer, IUserCanvasActionInitializeUser, IUserCanvasActionMouseMovement, IUserCanvasActionPropertiesChange, IUserCanvasActionShapeChange, IUserCanvasActionThemeBasedPropertiesChange, IUserEvent } from "../interfaces";
import { IUserPlayerActionClearEvents } from "../interfaces/actions/user/player/clear";
import { IUserPlayerActionRenderEvent } from "../interfaces/actions/user/player/play";
import { CaptureManager } from "./managers/capture";
import { SelectionManager } from "./managers/selection";
import { Renderer } from "./render";
import { EventStore, UserStore } from "./store";
import convertToUserEvent from "./structures/events";

export class Manager {

    selection: SelectionManager = new SelectionManager();
    capture: CaptureManager = new CaptureManager();

    public initializeUser(data: IUserCanvasActionInitializeUser) {
        const store = UserStore.getInstance();
        store.setUserName(data.user_name);
    }

    public initializeCanvas(data: IUserCanvasActionInitializeCanvas) {
        const renderer = Renderer.getInstance();
        renderer.initializeCanvas(
            data.canvas,
            data.dimensions,
        );
    }

    public initializeLayer(data: IUserCanvasActionInitializeLayer) {
        const renderer = Renderer.getInstance();
        renderer.initializeLayer(
            data.canvas
        )
    }

    /**
     * Handle changes made to the drawing properties
     * @param data 
     */
    public onCanvasDrawingPropertiesChange(data: IUserCanvasActionPropertiesChange): void {
        this.capture.onCanvasDrawingPropertiesChange(data.properties);
    }

    /**
     * Handle changes made to the selected shape 
     * @param data 
     */
    public onCanvasSelectedShapeChange(data: IUserCanvasActionShapeChange): void {
        this.capture.onCanvasSelectedShapeChange(data.shape);
        this.selection.onCanvasSelectedShapeChange(data.shape);
        const renderer = Renderer.getInstance();
        renderer.pushObjectsOntoCanvas();
    }

    /**
     * Handle mouse movement changes
     * @param data 
     */
    public onMouseMovementOnCanvas(data: IUserCanvasActionMouseMovement): IUserEvent| null {
        const event_store = EventStore.getInstance();
        if (this.capture.isEnabled()) {
            const event =  this.capture.onMouseMovement(data.point, data.is_mouse_down);
            
            if (event !== null)
                event_store.addEvent(event);

            return event;
        }

        const event = this.selection.onMouseMovement(data.point, data.is_mouse_down);
        if (event !== null)
            event_store.updateEvent(event);

        return event;
    }

    /**
     * Handle changes in properties related to theme
     * @param data 
     */
    public onCanvasThemeBasedPropertiesChange(data: IUserCanvasActionThemeBasedPropertiesChange): void {
        const renderer = Renderer.getInstance();
        renderer.initializeSelectOutlineColor(
            data.properties.select_outline_color,
        )
    }


    /**
     * Clear all events from the canvas & store
     * @param data 
     */
    public onCanvasClearAllEvents(data: IUserPlayerActionClearEvents) {
        const event_store = EventStore.getInstance()
        const renderer = Renderer.getInstance();

        event_store.reset();
        renderer.clearCanvas();
        renderer.clearLayer();
    }

    /**
     * Render the given event on the canvas
     * @param data Event JSON
     */
    public onCanvasRenderEvent(data: IUserPlayerActionRenderEvent) {
        const renderer = Renderer.getInstance();
        const event = convertToUserEvent(data.event);

        renderer.renderEvent(event);
    }
}