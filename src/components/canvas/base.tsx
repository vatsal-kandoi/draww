import * as React from "react";
import styled from "styled-components";
import { maximizeCanvasSize } from "../../utils";

const Canvas = styled.canvas`
    position: "absolute", 
    top: 0, 
    left: 0,
    cursor: "pointer", 
    display: "block",
    zIndex: 0,
`

interface ICanvasRawProps extends React.HTMLProps<HTMLCanvasElement> {
    /** Callback to be called when the canvas mounts */
    onCanvasMount: (canvas: HTMLCanvasElement) => void;
}

const CanvasRaw: React.FC<ICanvasRawProps> = (props) => {
    const ref = React.useRef<HTMLCanvasElement | null>(null)

    const { onCanvasMount } = props;

    React.useEffect(() => {
        if (ref.current === null) return;
        maximizeCanvasSize(ref);

        onCanvasMount(ref.current);
    }, [onCanvasMount])
    
    return (
        <Canvas ref={ref} {...props} />
    );
}


interface ICanvasBaseProps {
    /** Callback to be called when the canvas has mounted */
    onCanvasMount: (canvas: HTMLCanvasElement) => void;
    /** Callback to be called when the layer has mounted */
    onLayerMount: (canvas: HTMLCanvasElement) => void;
}

const CanvasBase: React.FC<ICanvasBaseProps> = (props) => {    
    const {onCanvasMount, onLayerMount} = props;

    return (
        <>
            <CanvasRaw 
                onCanvasMount={onCanvasMount} />
            <CanvasRaw 
                style={{backgroundColor: "transparent"}} 
                onCanvasMount={onLayerMount} />
        </>
    );
}


export default React.memo(CanvasBase);