import * as React from "react";
import { styled } from '@mui/material/styles';
import { Paper } from "@mui/material";
import { CommonProps } from "@mui/material/OverridableComponent";
import { useLanguageStore } from "../../hooks/languageprovider";
import { EventBase } from "../events/structures/event";
import { ShapeBase } from "./shapes/shape";
import { AnyARecord } from "dns";
import { setCanvasSizesToMax } from "../utils";

const CanvasContainer = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
}));


interface ICanvasProps {
    /** Props to be passed into the container for the canvas */
    containerProps?: any ;
}

export interface ICanvasRefs {
    /** Ref to be assigned to the container holding the canvas */
    canvasContainerRef: HTMLDivElement | null;
    /** Ref to be assigned to the canvas */
    canvasRef: HTMLCanvasElement | null;
    /** Render the given event on the canvas */
    renderEventOnCanvas(event: EventBase): void;
    /** Render the shape on the canvas */
    renderShapeOnCanvas(shape: ShapeBase): void;
    /** Clear the canvas of all elements */
    clearCanvas(): void;
    renderShapeOnLayer(shape: ShapeBase): void;
    clearLayer(): void;
}

const CanvasBase = React.forwardRef<ICanvasRefs, ICanvasProps>((props, refs) => {
    const i18n = useLanguageStore();
    const canvasContainerRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const temporaryCanvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useImperativeHandle(refs, () => ({
        canvasContainerRef: canvasContainerRef.current,
        canvasRef: canvasRef.current,
        renderShapeOnCanvas: (shape: ShapeBase) => {
            if (canvasContainerRef.current === null) return ;
            if (canvasRef.current === null) return;
            const contextAPI = canvasRef.current.getContext("2d");
            if (contextAPI === null) return;
            shape.render(contextAPI);
        },
        // We will assume any rendering on the temporary canvas will be done in its entirety, and clear up the previous canvas
        renderShapeOnLayer: (shape: ShapeBase) => {
            if (temporaryCanvasRef.current === null) return;
            const contextAPI = temporaryCanvasRef.current.getContext("2d");
            if (contextAPI === null) return;

            contextAPI.clearRect(0, 0, temporaryCanvasRef.current.width, temporaryCanvasRef.current.height);
            shape.render(contextAPI);
        },
        renderEventOnCanvas: (event: EventBase) => {
            if (canvasContainerRef.current === null) return ;
            if (canvasRef.current === null) return;
            const contextAPI = canvasRef.current.getContext("2d");
            if (contextAPI === null) return;

            event.render(contextAPI);            
        },
        clearLayer: () => {
            if (temporaryCanvasRef.current === null) return;
            const contextAPI = temporaryCanvasRef.current.getContext("2d");
            if (contextAPI === null) return;

            contextAPI.clearRect(0, 0, temporaryCanvasRef.current.width, temporaryCanvasRef.current.height);
        },
        clearCanvas: () => {
            if (canvasRef.current === null) return;
            const contextAPI = canvasRef.current.getContext("2d");
            if (contextAPI === null) return;

            contextAPI.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    }));

    React.useEffect(() => {
        setCanvasSizesToMax(canvasRef);
        setCanvasSizesToMax(temporaryCanvasRef);
    }, []);    

    return (
        <CanvasContainer ref={canvasContainerRef} 
                elevation={0}
                {...props.containerProps}>
            <canvas ref={canvasRef}
                    style={{
                        position: "absolute", 
                        top: 0, 
                        left: 0,
                        cursor: "pointer", 
                        display: "block",
                        zIndex: 0,
                    }} >
            </canvas>
            <canvas ref={temporaryCanvasRef}
                    style={{
                        position: "absolute", 
                        top: 0, 
                        left: 0,
                        cursor: "pointer", 
                        display: "block",
                        zIndex: 0,
                        backgroundColor: "transparent"
                    }} >
                {i18n.t("messages_unsupportedbrowser")}      
            </canvas>
        </CanvasContainer>
    );
});

export default CanvasBase;