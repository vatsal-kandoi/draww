
import * as React from "react";
import Canvas, { ICanvasRefs } from "../components/canvas/canvas";
import { connect } from "react-redux";
import { EventJSONBase, IProperties, ShapeTypes, UserAction } from "../interfaces";
import ShapeOptions from "../components/button-groups/shape-options";
import DrawProperties from "../components/button-groups/draw-properties";
import { Paper, Stack } from "@mui/material";
import { styled } from '@mui/material/styles';
import PageActions from "../components/button-groups/page-settings";
import { useTheme } from "@mui/material";

const ButtonStack = styled(Stack)(({ theme }) => ({
    ...theme.typography.body2,
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(3),
    width: "300px"
}));

const CanvasContainer = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
}));

const Main: React.FC<{
    onNewEvent: (eventJSON: EventJSONBase) => void;
}> = (props) => {
    const canvasRef = React.useRef<ICanvasRefs>(null);
    const [shapeType, setShapeType] = React.useState<ShapeTypes>(ShapeTypes.NONE);
    const { palette } = useTheme();
    const {onNewEvent} = props;

    React.useEffect(() => {
        if (canvasRef.current !== null) {
            canvasRef.current.sendThemeChange({ select_color: palette.text.secondary})
        }
    }, [palette, canvasRef])

    React.useEffect(() => {
        if (canvasRef.current !== null) {
            canvasRef.current.setupNewEventListener((event) => {
                console.log(event);
                onNewEvent(event);
            })
        }
    }, [canvasRef, onNewEvent]);

    const onShapeSelectionChange = (shape: ShapeTypes) => {
        if (canvasRef.current !== null) {
            canvasRef.current.sendShapeSelectionChange(shape);
            setShapeType(shape);
        }        
    }

    const onPropertiesChange = (properties: IProperties) => {
        if (canvasRef.current !== null) {
            canvasRef.current.sendPropertiesChange(properties);
        }        
    }    

    return (
        <>
            <CanvasContainer elevation={0}>
                <Canvas ref={canvasRef}/>  
            </CanvasContainer>
            <ShapeOptions onShapeSelectionChange={onShapeSelectionChange} />
            <DrawProperties 
                shapeType={shapeType}
                onPropertiesChange={onPropertiesChange}                
            />
            <ButtonStack>
                <PageActions />
            </ButtonStack>
       </>
    );
}


const mapDispatchToProps = (dispatch: any) => ({
    onNewEvent: (event: EventJSONBase) => {
        dispatch({
            type: UserAction.NEW_EVENT_ADDED,
            payload: event
        })
    },
});

export default connect(null , mapDispatchToProps)(React.memo(Main));