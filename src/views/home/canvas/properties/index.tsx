import * as React from "react";
import { ICanvasUserEventProperties, Shapes } from '../../../../interfaces';
import CanvasPropertiesOptions from "./options";


interface ICanvasPropertiesProps {
    /** Current selected shape by the user */
    shape: Shapes;
    /** Callback triggered on properties change */
    onPropertiesChange: (properties: ICanvasUserEventProperties) => void;
}

const CanvasProperties: React.FC<ICanvasPropertiesProps> = (props) => {
    const {shape, onPropertiesChange} = props;

    const renderOptions = () => {
        switch (shape) {
            case (Shapes.NONE): {
                return <></>;
            }
            case (Shapes.PEN): {
                return (
                    <>
                        <CanvasPropertiesOptions.StrokeColor />
                    </>
                )
            }
            case (Shapes.SQUARE): {
                return (
                    <>
                        <CanvasPropertiesOptions.StrokeColor />
                        <CanvasPropertiesOptions.StrokeStyle />
                    </>
                )
            }
        }
    }

    return (
        <CanvasPropertiesOptions onPropertiesChange={(properties) => {
            onPropertiesChange(properties);
        }}>
            {renderOptions()}
        </CanvasPropertiesOptions>
    );
}

export default CanvasProperties;