import React from "react";
import { connect } from "react-redux";
import { CanvasActionType } from "../../interfaces/enums";
import { IAttributeOptions } from "../../interfaces/attributeOptions";
import { useLanguageStore } from "../../hooks/languageprovider";
import { styled } from '@mui/material/styles';
import { Paper } from "@mui/material";
import { useMousePositions, useMousePress } from "../../hooks/mousePositionProvider";


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
}

const Canvas: React.FC<ICanvasProps> = (props) => {
    const i18n = useLanguageStore();
    const canvasContainerRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const {current, previous} = useMousePositions();
    const isMousePressed = useMousePress();

    React.useEffect(() => {
        if (!isMousePressed) return;
        if (canvasRef.current === null) return;

        const context = canvasRef.current.getContext("2d");
        if (context === null) return;
    
        context.beginPath();
        context.moveTo(previous.x, previous.y);
        context.lineTo(current.x, current.y);
        context.closePath();
        context.stroke();    
    }, [current, previous, isMousePressed]);

    React.useEffect(() => {
        if (canvasContainerRef.current === null) return ;
        if (canvasRef.current === null) return;
        canvasRef.current.width = canvasContainerRef.current.offsetWidth;
        canvasRef.current.height = canvasContainerRef.current.offsetHeight;
        canvasRef.current.style.backgroundColor = canvasContainerRef.current.style.backgroundColor;
    }, []);

    React.useEffect(() => {
        if (canvasRef.current === null) return;
        const context = canvasRef.current.getContext("2d");
        if (context === null) return;
        context.strokeStyle = props.color;
    }, [props.color])
    
    return (
        <CanvasContainer ref={canvasContainerRef} elevation={0}>
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
  
export default connect(mapStateToProps, )(Canvas);