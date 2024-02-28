import * as React from "react"
import { Stack, Tooltip } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useLanguageStore } from "../../hooks/languageprovider";


const ColorPickerButton = styled(Button)(({ theme }) => ({
    width: "1em",
    height: "1em",
    minWidth: "1em",
    borderRadius: "0.5em",
    marginRight: theme.spacing(2),
}));

const ColorPicker: React.FC<{defaultColor: string, onSelectionChange: any}> = (props) => {
    const i18n = useLanguageStore();
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
            <Tooltip title={i18n.t("aria_buttons_color_picker")}>
                <ColorPickerButton onClick={openColorPicker}
                        aria-label={i18n.t("aria_buttons_color_picker")} 
                        style={{backgroundColor: value}}/>
            </Tooltip>
            <TextField id="input-field-color" 
                    label="Color" 
                    variant="standard"
                    aria-label={i18n.t("aria_inputs_color_picker")} 
                    value={value} onChange={(event) => {onValueChange(event.target.value)}}/>
        </Stack>
    );
}

export default ColorPicker