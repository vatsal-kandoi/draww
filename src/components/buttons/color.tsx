import * as React from "react";
import Button from "./button";


const ColorPicker: React.FC<{defaultColor: string, onSelectionChange: (color: string) => void}> = (props) => {
    const [value, onValueChange] = React.useState<string>(props.defaultColor);
    const ref = React.useRef<HTMLInputElement>(null);
        
    const handleColorPickerInput = (event: React.MouseEvent<HTMLElement>) => {
        props.onSelectionChange(value);
    };

    const onColorChange = (event: any) => {
        onValueChange(event.target.value);
        props.onSelectionChange(event.target.value);
    }

    const openColorPicker = (event: MouseEvent) => {
        ref?.current?.click();
        event.preventDefault();
    }

    React.useEffect(() => {
        ref?.current?.addEventListener('contextmenu', openColorPicker);

        return () => {
            ref?.current?.removeEventListener("contextmenu", openColorPicker);
        };
    }, [ref]);

    return (
        <Button onClick={handleColorPickerInput} 
                style={{backgroundColor: value}}>
            <input type="color" 
                    onChange={onColorChange}
                    id="input-color-picker" 
                    name="input-color-picker" 
                    value={value} 
                    style={{opacity: 0, width: 0, height: 0}}
                    aria-hidden={true}
                    ref={ref} />            
        </Button>        
    );
}

export default React.memo(ColorPicker);