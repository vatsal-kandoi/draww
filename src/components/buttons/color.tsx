import * as React from "react";
import Button from "./button";


const ColorPicker: React.FC<{defaultColor: string, onSelectionChange: (color: string) => void}> = (props) => {
    const [value, onValueChange] = React.useState<string>(props.defaultColor);
    const colorPickerInputRef = React.useRef<HTMLInputElement>(null);
        
    const openColorPicker = (event: React.MouseEvent<HTMLElement>) => {
        colorPickerInputRef.current?.click();
        props.onSelectionChange(value);
    };

    const onColorChange = (event: any) => {
        onValueChange(event.target.value);
        props.onSelectionChange(event.target.value);
    }

    return (
        <Button onClick={openColorPicker} 
                style={{backgroundColor: value}}>
            <input type="color" 
                    onChange={onColorChange}
                    id="input-color-picker" 
                    name="input-color-picker" 
                    value={value} 
                    style={{opacity: 0, width: 0, height: 0}}
                    aria-hidden={true}
                    ref={colorPickerInputRef} />            
        </Button>        
    );
}

export default React.memo(ColorPicker);