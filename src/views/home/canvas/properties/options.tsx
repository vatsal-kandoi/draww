import * as React from "react";
import { ICanvasUserEventProperties, Shapes } from '../../../../interfaces';
import CanvasPropertiesProviderContext from "../../../../contexts/canvasproperties";
import useCanvasPropertiesProvider from "../../../../hooks/canvasproperties";
import StrokeStyle from "./strokestyle";

interface ICanvasPropertiesProps {
    /** Callback triggered on properties change */
    onPropertiesChange: (properties: ICanvasUserEventProperties) => void;
    /** Children */
    children: React.ReactElement | React.ReactElement[];
}

interface ICanvasPropertiesOptions {
    StrokeStyle: typeof StrokeStyle
}

const CanvasPropertiesOptions: React.FC<ICanvasPropertiesProps> & ICanvasPropertiesOptions = (props) => {
    const { contextValue, properties } = useCanvasPropertiesProvider();
    const { children, onPropertiesChange} = props;

    React.useEffect(() => {
        console.log(properties)
        onPropertiesChange(properties);
    }, [onPropertiesChange, properties])

    return (
        <CanvasPropertiesProviderContext.Provider value={contextValue}>
            {children}
        </CanvasPropertiesProviderContext.Provider>
    );
}

CanvasPropertiesOptions.StrokeStyle = StrokeStyle;

export default CanvasPropertiesOptions;