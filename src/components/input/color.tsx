import React, { SyntheticEvent } from "react"
import { Stack } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';


const ColorPickerButton = styled(Button)(({ theme }) => ({
    width: "20px",
    height: "20px",
    minWidth: "20px",
    borderRadius: "10px",
    marginRight: theme.spacing(2),
}));

const ColorPicker: React.FC<{defaultColor: string, onSelectionChange: any}> = (props) => {
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
            <ColorPickerButton onClick={openColorPicker} 
                    style={{backgroundColor: value}}/>
            <TextField id="input-field-color" 
                    label="Color" 
                    variant="standard" 
                    value={value} onChange={(event) => {onValueChange(event.target.value)}}/>
        </Stack>
    );
}

export default ColorPicker