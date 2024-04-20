import { IInitCanvas, IMouseMoveEvent, IInitUser, UserAction, IShapeChange, INewEvent } from "../interfaces";
import { Manager } from "./manager";

const manager = new Manager();

onmessage = (e: MessageEvent ) => {
    const data = e.data as { action: UserAction, [key: string]: any };

    switch (data.action) {
        case UserAction.INIT_USER: {        
            manager.onUserInit((data as IInitUser).user_name);
            break;
        } 
        case UserAction.INIT_CANVAS: {
            manager.onCanvasInit(
                (data as IInitCanvas).canvas, 
                (data as IInitCanvas).dimensions
            );
            break;
        }
        case UserAction.SHAPE_CHANGE: {
            manager.onSelectedShapeChange((data as IShapeChange).shape);
            break;
        }
        case UserAction.MOUSE_MOVE_EVENT: {
            const event = manager.onMouseMoveEvent(
                (data as IMouseMoveEvent).point,
                (data as IMouseMoveEvent).isMouseDown
            );
            if (event !== null) {
                postMessage({
                    type: UserAction.NEW_EVENT_ADDED,
                    event: event.exportToJson(),
                } as INewEvent);
            }
            break;
        }
    }
};