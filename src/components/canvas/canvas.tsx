import * as React from "react";
import { setupCanvasRenderer, CanvasInterface } from "../../canvas/api2";
import CanvasBase from "./base";
import { ICanvasUserEventProperties, Point, Shapes } from "../../interfaces";

export interface ICanvasRefs {
    /** Initialize the worker on the thread */
    initializeUser: (user_name: string) => void;  
    /** Send the change in drawing propties to the worker */
    onCanvasDrawingPropertiesChange: (properties: ICanvasUserEventProperties) => void;
    /** Send the change in selected shape to the worker */
    onCanvasSelectedShapeChange: (shape: Shapes) => void;
    /** Send the current location to the worker */
    onMouseMovementOnCanvas: (point: Point, is_mouse_down: boolean) => void;
}

const Canvas = React.forwardRef<ICanvasRefs, {}>((props, refs) => {
    const api: CanvasInterface = React.useMemo(() => {
        return setupCanvasRenderer();
    }, []);

    React.useImperativeHandle(refs, () => ({
        /**
         * Initiliase the user on the remote worker
         * @param user_name 
         */
        initializeUser: (user_name: string) => {
            api.initializeUser(user_name)
        },

        /**
         * Send the change in drawing propties to the worker
         * @param properties Drawing properties chosen by user
         */
        onCanvasDrawingPropertiesChange: (properties: ICanvasUserEventProperties) => {
            api.onCanvasDrawingPropertiesChange(properties);
        },
        /**
         * Send the change in selected shape to the worker
         * @param shape Select shape
         */
        onCanvasSelectedShapeChange: (shape: Shapes) => {
            api.onCanvasSelectedShapeChange(shape);
        },
        /**
         * Send the current location to the worker
         * @param point Current location
         * @param is_mouse_down whether the mouse is pressed or not
         */
        onMouseMovementOnCanvas: (point: Point, is_mouse_down: boolean) => {
            api.onMouseMovementOnCanvas(point, is_mouse_down);
        }
    }));

    const onCanvasMount = React.useCallback((canvas: HTMLCanvasElement) => {
        api.initializeCanvas(canvas, {x: canvas.width, y: canvas.height});
    }, [api]);

    const onLayerMount = React.useCallback((canvas: HTMLCanvasElement) => {
        api.initializeLayer(canvas);
    }, [api]);

    return (
        <>
            <CanvasBase onCanvasMount={onCanvasMount}
                    onLayerMount={onLayerMount} />
        </>
    );
});

export default React.memo(Canvas);


