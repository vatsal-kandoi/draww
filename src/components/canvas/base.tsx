import * as React from "react";
import { maximizeCanvasSize } from "../utils";

const CanvasRaw: React.FC<{
    onCanvasMount: (canvas: HTMLCanvasElement) => void;
    onTemporaryCanvasMount: (canvas: HTMLCanvasElement) => void;
}> = (props) => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
    const temporaryCanvasRef = React.useRef<HTMLCanvasElement>(null);
    
    const {onCanvasMount, onTemporaryCanvasMount} = props;

    React.useEffect(() => {
        if (canvasRef.current === null) return;
        maximizeCanvasSize(canvasRef);

        onCanvasMount(canvasRef.current);
    }, [onCanvasMount]);
    
    React.useEffect(() => {
        if (temporaryCanvasRef.current === null) return;
        maximizeCanvasSize(temporaryCanvasRef);

        onTemporaryCanvasMount(temporaryCanvasRef.current);
    }, [onTemporaryCanvasMount]);

    return (
        <>
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
            </canvas>        
        </>
    );
}


export default React.memo(CanvasRaw);