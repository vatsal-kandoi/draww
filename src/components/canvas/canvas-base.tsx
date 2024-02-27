import React, { RefObject } from "react";
import { useLanguageStore } from "../../hooks/languageprovider";
import { styled } from '@mui/material/styles';
import { Paper } from "@mui/material";
import { Event } from "../../structures/event";

const CanvasContainer = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
}));

interface ICanvasProps {
    containerProps?: any;
    canvasProps?: any;
}

export interface ICanvasRefs {
    canvasContainerRef: HTMLDivElement | null;
    canvasRef: HTMLCanvasElement | null;
    renderEventOnCanvas(event: Event): void;
    clearCanvas(): void;
}

const CanvasBase = React.forwardRef<ICanvasRefs, ICanvasProps>((props, refs) => {
    const i18n = useLanguageStore();
    const canvasContainerRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null)

    React.useImperativeHandle(refs, () => ({
        canvasContainerRef: canvasContainerRef.current,
        canvasRef: canvasRef.current,
        renderEventOnCanvas: (event: Event) => {
            if (canvasContainerRef.current === null) return ;
            if (canvasRef.current === null) return;
            const contextAPI = canvasRef.current.getContext("2d");
            if (contextAPI === null) return;

            event.render(contextAPI);            
        },
        clearCanvas: () => {
            if (canvasRef.current === null) return;
            const contextAPI = canvasRef.current.getContext("2d");
            if (contextAPI === null) return;

            contextAPI.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    }));
    
    React.useEffect(() => {
        if (canvasRef.current === null) return;

        canvasRef.current.style.width ='100%';
        canvasRef.current.style.height='100%';
        canvasRef.current.style.backgroundColor = "inherit";        
        canvasRef.current.style.margin = "0px";
        canvasRef.current.style.padding = "0px";

        canvasRef.current.width  = canvasRef.current.offsetWidth;
        canvasRef.current.height = canvasRef.current.offsetHeight;
    }, []);    
    
    return (
        <CanvasContainer ref={canvasContainerRef} 
                elevation={0}
                {...props.containerProps}>
            <canvas ref={canvasRef}
                    {...props.canvasProps}>
                {i18n.t("messages_unsupportedbrowser")}      
            </canvas>
        </CanvasContainer>
    );
});

export default CanvasBase;