import { IUserCanvasActionBase, IUserCanvasActionEventAdded, IUserCanvasActionInitializeCanvas, IUserCanvasActionInitializeLayer, IUserCanvasActionInitializeUser, IUserCanvasActionMouseMovement, IUserCanvasActionPropertiesChange, IUserCanvasActionShapeChange, IUserCanvasActionThemeBasedPropertiesChange, UserCanvasActionType } from "../interfaces"
import { Manager } from "./manager";

const manager = new Manager();

onmessage = (e: MessageEvent ) => {
    const data = e.data as IUserCanvasActionBase;

    switch (data.type) {
        case UserCanvasActionType.CANVAS_INITIALIZE_USER: {
            manager.initializeUser(data as IUserCanvasActionInitializeUser)
            break;
        }
        case UserCanvasActionType.CANVAS_INITIALIZE_MAIN_CANVAS: {
            manager.initializeCanvas(data as IUserCanvasActionInitializeCanvas)
            break;
        }
        case UserCanvasActionType.CANVAS_INITIALIZE_TEMPORARY_LAYER: {
            manager.initializeLayer(data as IUserCanvasActionInitializeLayer)
            break;
        }
        case UserCanvasActionType.CANVAS_CHANGE_DRAWING_PROPERTIES: {
            manager.onCanvasDrawingPropertiesChange(data as IUserCanvasActionPropertiesChange)
            break;
        }
        case UserCanvasActionType.CANVAS_CHANGE_SELECTED_SHAPE: {
            manager.onCanvasSelectedShapeChange(data as IUserCanvasActionShapeChange)
            break;
        }
        case UserCanvasActionType.CANVAS_CHANGE_MOUSE_POSITION: {
            const event = manager.onMouseMovementOnCanvas(data as IUserCanvasActionMouseMovement)
            if (event !== null) 
                postMessage({
                    type: UserCanvasActionType.CANVAS_EVENTS_ADDED,
                    event: event.exportToJson(),
                } as IUserCanvasActionEventAdded)

            break;
        }
        case UserCanvasActionType.CANVAS_CHANGE_THEME_BASED_PROPERTIES: {
            manager.onCanvasThemeBasedPropertiesChange(data as IUserCanvasActionThemeBasedPropertiesChange);
            break;
        }    
    }
}