import React from "react";
import { connect } from "react-redux";
import { CanvasActionType, CanvasEventType } from "../../interfaces/enums";
import { IAttributeOptions } from "../../interfaces/attributeOptions";
import { useLanguageStore } from "../../hooks/languageprovider";
import { styled } from '@mui/material/styles';
import { Paper } from "@mui/material";
import { useMousePositions, useMousePress } from "../../hooks/mousePositionProvider";
import { renderObjectOntoCanvas } from "../factory";
import useEventDeletionEvents from "../../hooks/eventDeletionProvider";


const CanvasContainer = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
}));

interface ICanvasProps extends IAttributeOptions {
    selectedCanvasAction: CanvasActionType,
    onNewEvent: any,
}

function makeEventID(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const Canvas: React.FC<ICanvasProps> = (props) => {
    const i18n = useLanguageStore();
    const [captureMousePosition, setCaptureMousePosition] = React.useState<boolean>(false);
    const canvasContainerRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const {current, previous} = useMousePositions(captureMousePosition);
    const isMousePressed = useMousePress(captureMousePosition);

    useEventDeletionEvents(canvasRef)

    const [capture, setCapture] = React.useState<{capturing: boolean, shape: any}>({ capturing: false, shape: null });


    React.useEffect(() => {
        if (isMousePressed) {
            if (canvasRef.current === null) return;

            const context = canvasRef.current.getContext("2d");
            if (context === null) return;
    
            const shape = renderObjectOntoCanvas(
                props.selectedCanvasAction, 
                current, 
                previous,
                { color: props.color, },
                context
            );
            setCapture((prevState) => { return { capturing: true, shape: [ ...(prevState.shape || []), shape ] }});
        } else {
            if (props.selectedCanvasAction === CanvasActionType.NONE) {

            }
            if (capture.capturing) {
                props.onNewEvent(capture.shape, `added ${capture.shape.length} lines`, "Pen" );
            }
            setCapture({ capturing: false, shape: null });
        }
    }, [current, previous, isMousePressed, props.color, props.selectedCanvasAction]);



    React.useEffect(() => {
        if (canvasContainerRef.current === null) return ;
        if (canvasRef.current === null) return;
        canvasRef.current.style.width ='100%';
        canvasRef.current.style.height='100%';
        canvasRef.current.style.backgroundColor = "inherit";
        canvasRef.current.width  = canvasRef.current.offsetWidth;
        canvasRef.current.height = canvasRef.current.offsetHeight;
    }, []);
    
    return (
        <CanvasContainer ref={canvasContainerRef} 
                elevation={0}
                onMouseEnter={() => setCaptureMousePosition(true)}
                onMouseLeave={() => setCaptureMousePosition(false)}>
            <canvas style={{cursor: "pointer"}}
                    ref={canvasRef}>
                {i18n.t("messages_unsupportedbrowser")}      
            </canvas>
        </CanvasContainer>
    );
}


const mapStateToProps = (state: any) => ({
    selectedCanvasAction: state.selectedCanvasAction.activeCanvasActionType,
    color: state.attributes.color
}); 


const mapDispatchToProps = (dispatch: any) => ({
    onNewEvent: (shape: any, description: string, header: string) => dispatch({ 
        type: CanvasEventType.ADD,
        payload: { user_name: "Vatsal", shape: shape, description: description, header: header, event_id: makeEventID(10) }
    }),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Canvas);