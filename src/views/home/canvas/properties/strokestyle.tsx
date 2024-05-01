import React from "react"
import { FormControl, FormLabel } from "@mui/material";
import ColorPickerButtonGroup from "../../../../components/button-groups/color-picker";
import CanvasPropertiesProviderContext from "../../../../contexts/canvasproperties";


const StrokeStyle: React.FC<{}> = () => {
    const {borderColor, setBorderColor} = React.useContext(CanvasPropertiesProviderContext);

    return (
        <FormControl>
            <FormLabel>Stroke Color</FormLabel>
            <ColorPickerButtonGroup 
                    value={borderColor}
                    onChange={setBorderColor}
                    defaultOptions={["#666", "#E52A2A", "#5CE52A"]} /> 
        </FormControl>        
    );
}

export default StrokeStyle;