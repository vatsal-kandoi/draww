import { IInitializeCanvas, IMouseMoveEvent, IUserSet, UserAction } from "../interfaces";
import { CanvasManager } from "./manager";

const manager = new CanvasManager();

onmessage = (e: MessageEvent ) => {
    const data = e.data as { action: UserAction, [key: string]: any };

    switch (data.action) {
        case UserAction.SET_USER: {        
            manager.registerUser((data as IUserSet).user_name);
            break;
        } 
        case UserAction.SET_CANVAS: {
            manager.registerCanvas((data as IInitializeCanvas).canvas, (data as IInitializeCanvas).dimensions);
            break;
        }
        case UserAction.MOUSE_MOVE_EVENT: {
            manager.registerMouseMoveEvent(
                (data as IMouseMoveEvent).point,
                (data as IMouseMoveEvent).isMouseDown
            );
            break;
        }
    }
};