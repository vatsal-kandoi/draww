import * as React from "react";
import { maximizeCanvasSize } from "../utils";

const CanvasRaw: React.FC<{
    onCanvasMount: (canvas: HTMLCanvasElement) => void;
}> = (props) => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
    const {onCanvasMount} = props;

    React.useEffect(() => {
        if (canvasRef.current === null) return;
        maximizeCanvasSize(canvasRef);

        onCanvasMount(canvasRef.current);
    }, [onCanvasMount]);
    

    return (
        <canvas ref={canvasRef}></canvas>
    );
}


export default React.memo(CanvasRaw);