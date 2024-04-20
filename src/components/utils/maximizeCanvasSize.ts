import { RefObject } from "react";

export function maximizeCanvasSize(canvasRef: RefObject<HTMLCanvasElement>) {
    if (canvasRef.current === null) return;

    canvasRef.current.style.width ='100%';
    canvasRef.current.style.height='100%';
    canvasRef.current.style.margin = "0px";
    canvasRef.current.style.padding = "0px";

    canvasRef.current.width  = canvasRef.current.offsetWidth;
    canvasRef.current.height = canvasRef.current.offsetHeight;
}
