
import * as React from "react";
import Canvas, { ICanvasRefs } from "../components/canvas/canvas";
import { connect } from "react-redux";
import { EventJSONBase, IProperties, ShapeTypes, UserAction } from "../interfaces";
import ShapeOptions from "../components/button-groups/shape-options";
import DrawProperties from "../components/button-groups/draw-properties";

const Main: React.FC<{
    onNewEvent: (eventJSON: EventJSONBase) => void;
}> = (props) => {
    const canvasRef = React.useRef<ICanvasRefs>(null);
    const [shapeType, setShapeType] = React.useState<ShapeTypes>(ShapeTypes.NONE);
    const {onNewEvent} = props;

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
            <Canvas ref={canvasRef}/>  
            <ShapeOptions onShapeSelectionChange={onShapeSelectionChange} />
            <DrawProperties 
                shapeType={shapeType}
                onPropertiesChange={onPropertiesChange}                
            />
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