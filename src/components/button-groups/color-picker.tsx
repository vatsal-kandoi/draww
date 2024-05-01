import { Stack } from "@mui/material";
import * as React from "react";
import ColorPicker from "../buttons/color";

interface IColorPickerButtonGroup {
    /** Default color options available to user. User can choose to customize from picker */
    defaultOptions: string[];
    /** Currently active value */
    value: string;
    /** Triggered on color change */
    onChange: (color: string) => void;
}
const ColorPickerButtonGroup: React.FC<IColorPickerButtonGroup> = (props) => {
    const {value, defaultOptions, onChange} = props;

    const [colorsOnDisplay, setColorsOnDisplay] = React.useState<string[]>(defaultOptions);

    const handleSelectedColorChange = (idx: number, color: string) => {
        const colors = colorsOnDisplay;
        colors[idx] = color;
        setColorsOnDisplay(colors);
        onChange(color);
    }

    return (
        <Stack direction="row"
                justifyContent="start"
                alignItems="center"
                spacing={1} 
                component="div"
                role="group">
            {colorsOnDisplay.map((color: string, idx: number) => {
                return (
                    <ColorPicker defaultColor={color} 
                            onSelectionChange={(color) => handleSelectedColorChange(idx, color)}/>                    
                );
            })}
        </Stack>
    );
}


export default React.memo(ColorPickerButtonGroup);