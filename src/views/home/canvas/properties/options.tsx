import * as React from "react";
import { ICanvasUserEventProperties } from '../../../../interfaces';
import CanvasPropertiesProviderContext from "../../../../contexts/canvasproperties";
import useCanvasPropertiesProvider from "../../../../hooks/canvasproperties";
import StrokeColor from "./strokecolor";
import StrokeStyle from "./strokestyle";
import { Stack } from "@mui/material";

interface ICanvasPropertiesProps {
    /** Callback triggered on properties change */
    onPropertiesChange: (properties: ICanvasUserEventProperties) => void;
    /** Children */
    children: React.ReactElement | React.ReactElement[];
}

interface ICanvasPropertiesOptions {
    StrokeColor: typeof StrokeColor;
    StrokeStyle: typeof StrokeStyle;
}

const CanvasPropertiesOptions: React.FC<ICanvasPropertiesProps> & ICanvasPropertiesOptions = (props) => {
    const { contextValue, properties } = useCanvasPropertiesProvider();
    const { children, onPropertiesChange} = props;

    React.useEffect(() => {
        onPropertiesChange(properties);
    }, [onPropertiesChange, properties])

    return (
        <CanvasPropertiesProviderContext.Provider value={contextValue}>
            <Stack direction={"column"}
                    spacing={2}>
                {children}
            </Stack>
        </CanvasPropertiesProviderContext.Provider>
    );
}

CanvasPropertiesOptions.StrokeColor = StrokeColor;
CanvasPropertiesOptions.StrokeStyle = StrokeStyle;

export default CanvasPropertiesOptions;