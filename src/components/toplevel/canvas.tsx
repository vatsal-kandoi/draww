import React from "react";
import { connect } from "react-redux";
import { CanvasActionType, CanvasEventType } from "../../interfaces/enums";
import { IAttributeOptions } from "../../interfaces/attributeOptions";
import { useLanguageStore } from "../../hooks/languageprovider";
import { styled } from '@mui/material/styles';
import { Paper } from "@mui/material";
import { useMousePositions, useMousePress } from "../../hooks/mousePositionProvider";
import { Event } from "../../structures/event";
import useEventCaptureManager from "../../hooks/eventCaptureManager";
import useCanvasDisplayManager from "../../hooks/canvasDisplayManager";


const CanvasContainer = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
}));

interface ICanvasProps {
    selectedCanvasAction: CanvasActionType,
    registerNewEvent: any,
    attributes: IAttributeOptions
}

const Canvas: React.FC<ICanvasProps> = (props) => {
    const i18n = useLanguageStore();
    const [captureMousePosition, setCaptureMousePosition] = React.useState<boolean>(false);
    const canvasContainerRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const {current, previous} = useMousePositions(captureMousePosition);
    const isMousePressed = useMousePress(captureMousePosition);
    const captureManager = useEventCaptureManager(props.selectedCanvasAction, props.attributes);

    const newEvent = useCanvasDisplayManager(captureManager, canvasRef, current, previous, isMousePressed);

    React.useEffect(() => {
        if (newEvent !== undefined) 
            props.registerNewEvent(newEvent);
    }, [newEvent]);

    React.useEffect(() => {
        if (canvasContainerRef.current === null) return ;
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
                onMouseEnter={() => setCaptureMousePosition(true)}
                onMouseLeave={() => setCaptureMousePosition(false)}>
            <canvas style={{cursor: "pointer", display: "block"}}
                    ref={canvasRef}>
                {i18n.t("messages_unsupportedbrowser")}      
            </canvas>
        </CanvasContainer>
    );
}


const mapStateToProps = (state: any) => ({
    selectedCanvasAction: state.selectedCanvasAction.activeCanvasActionType,
    attributes: state.attributes
}); 


const mapDispatchToProps = (dispatch: any) => ({
    registerNewEvent: (event: Event) => dispatch({ 
        type: CanvasEventType.ADD,
        payload: event
    }),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Canvas);