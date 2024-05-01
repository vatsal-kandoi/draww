import React from "react"
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import CanvasPropertiesProviderContext from "../../../../contexts/canvasproperties";
import { StrokeStyles } from "../../../../interfaces";


const StrokeStyle: React.FC<{}> = () => {
    const { strokeStyle, setStrokeStyle } = React.useContext(CanvasPropertiesProviderContext);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStrokeStyle((event.target as HTMLInputElement).value as StrokeStyles);
    };    

    return (
        <FormControl>
            <FormLabel id="stroke-style-label">Stroke Style</FormLabel>
            <RadioGroup row
                    aria-labelledby="stroke-style-label"
                    onChange={handleChange}
                    name="strokestyle" defaultValue={strokeStyle} >
                <FormControlLabel
                    value={StrokeStyles.SOLID}
                    control={<Radio />}
                    label="Solid"
                    labelPlacement="start"
                />
                <FormControlLabel
                    value={StrokeStyles.DASH}
                    control={<Radio />}
                    label="Dashed"
                    labelPlacement="start"
                />
                <FormControlLabel
                    value={StrokeStyles.DOTTED}
                    control={<Radio />}
                    label="Dotted"
                    labelPlacement="start"
                />
            </RadioGroup>
        </FormControl>
    );
}

export default StrokeStyle;