import * as React from "react"
import { Stack, Tooltip } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';


const ColorPickerButton = styled(Button)(({ theme }) => ({
    width: "1em",
    height: "1em",
    minWidth: "1em",
    borderRadius: "0.5em",
    marginRight: theme.spacing(2),
}));

const ColorPicker: React.FC<{defaultColor: string, onSelectionChange: (color: string) => void}> = (props) => {
    const [value, onValueChange] = React.useState<string>(props.defaultColor);
    const colorPickerInputRef = React.useRef<HTMLInputElement>(null);
        
    const openColorPicker = (event: React.MouseEvent<HTMLElement>) => {
        colorPickerInputRef.current?.click();
    };

    const onColorChange = (event: any) => {
        onValueChange(event.target.value);
        props.onSelectionChange(event.target.value);
    }

    return (
        <Stack direction={"row"}
                alignItems={"center"}
                justifyContent={"flex-start"} >
            <input type="color" 
                    onChange={onColorChange}
                    id="input-color-picker" 
                    name="input-color-picker" 
                    value={value} 
                    style={{opacity: 0, width: 0, height: 0}}
                    aria-hidden={true}
                    ref={colorPickerInputRef} />
            <Tooltip title={"Select color"}>
                <ColorPickerButton onClick={openColorPicker}
                        aria-label={"Select color"} 
                        style={{backgroundColor: value}}/>
            </Tooltip>
            <TextField id="input-field-color" 
                    label="Color" 
                    variant="standard"
                    aria-label={"Select color"} 
                    value={value} onChange={(event) => {onValueChange(event.target.value)}}/>
        </Stack>
    );
}

export default ColorPicker