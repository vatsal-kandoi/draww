
import * as React from 'react';
import { Paper, Stack, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ICanvasUserEventProperties, IUserCanvasActionEventAdded, IUserEventJSON, Shapes } from '../../interfaces';
import CanvasOptions from "./options";
import CanvasProperties from "./properties";
import CanvasBase, { ICanvasRefs } from './canvas';

interface CanvasProps {
    /** Rendert the shape options component on the canvas in a particular palce */
    renderShapeOptions: (props: {
        /** Current selected shape by the user */
        shape: Shapes;
        /** Handler to be called on shape change */
        onShapeChange: (shape: Shapes) => void;          
    }) => React.ReactElement;

    /** Rendert the shape options component on the canvas in a particular palce */
    renderCanvasProperties: (props: {
        /** Current selected shape by the user */
        shape: Shapes;
        /** Handler to be called on shape change */
        onPropertiesChange: (properties: ICanvasUserEventProperties) => void;
    }) => React.ReactElement;
    onEventChangeHandler: (event: IUserEventJSON) => void;
}

const Container = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: "100vh",
}));

const FullWidthContainer = styled(Stack)(({ theme }) => ({
    ...theme.typography.body2,
    position: "relative",
    width: "100%",
    height: "100%",
}));


const Canvas: React.FC<CanvasProps> = (props) => {
    const ref = React.useRef<ICanvasRefs>(null)
    const [selectedShape, setSelectedShape] = React.useState<Shapes>(Shapes.NONE);
    const [isInsideCanvas, setIsInsideCanvas] = React.useState<boolean>(false);
    const { palette } = useTheme();
    const { onEventChangeHandler } = props;

    React.useEffect(() => {
        if (ref.current !== null) {
            ref.current.setupCanvasUserEventAddListener((data: IUserCanvasActionEventAdded) => {
                onEventChangeHandler(data.event);
            });
        }
    }, [onEventChangeHandler])


    const onShapeChange = (shape: Shapes) => {
        setSelectedShape(shape);
        ref?.current?.onCanvasSelectedShapeChange(shape);
    }

    const onPropertiesChange = (properties: ICanvasUserEventProperties) => {
        ref?.current?.onCanvasDrawingPropertiesChange(properties);
    }

    const mouseMoveEvent = (mouseMoveEvt: MouseEvent) => {
        const isPressed = mouseMoveEvt.buttons !== 0 && mouseMoveEvt.button === 0;
        const x = mouseMoveEvt.clientX;
        const y = mouseMoveEvt.clientY;
        ref?.current?.onMouseMovementOnCanvas({ x, y }, isPressed);
    };

    const mouseDownEvent = (mouseMoveEvt: MouseEvent) => {
        const x = mouseMoveEvt.clientX;
        const y = mouseMoveEvt.clientY;
        ref?.current?.onMouseMovementOnCanvas({ x, y }, true);
    };

    React.useEffect(() => {
        ref?.current?.onCanvasThemeBasedPropertiesChange(palette);
    }, [palette]);

    React.useEffect(() => {
        if (isInsideCanvas) {
            document.addEventListener("mousemove", mouseMoveEvent);
            document.addEventListener("mousedown", mouseDownEvent);    
        } else {
            document.removeEventListener("mousemove", mouseMoveEvent);
            document.removeEventListener("mousedown", mouseDownEvent);
        }

        return () => {
            document.removeEventListener("mousemove", mouseMoveEvent);
            document.removeEventListener("mousedown", mouseDownEvent);
        };
    }, [isInsideCanvas]);

    const renderChildren = () => {
        return (
            <>
                <CanvasOptions>
                    {props.renderShapeOptions({
                        shape: selectedShape,
                        onShapeChange: onShapeChange,
                    })}
                </CanvasOptions>
                <CanvasProperties>
                    {props.renderCanvasProperties({
                        shape: selectedShape,
                        onPropertiesChange: onPropertiesChange,
                    })}
                </CanvasProperties>
            </>
        );
    }

    return (
        <Container elevation={0}>
            <FullWidthContainer onMouseEnter={() => setIsInsideCanvas(true)}
                    onMouseLeave={() => setIsInsideCanvas(false)}
                    as={"div"}>
                <CanvasBase ref={ref}/>
            </FullWidthContainer>            
            {renderChildren()}
        </Container>

    );
};

export default Canvas;