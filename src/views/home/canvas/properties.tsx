import * as React from "react";
import Stack from '@mui/material/Stack';
import ColorPicker from "../../../components/input/color";
import { ICanvasUserEventProperties, Shapes } from "../../../interfaces";


interface ICanvasPropertiesProps {
    /** Current selected shape by the user */
    shape: Shapes;
    /** Callback triggered on properties change */
    onPropertiesChange: (properties: ICanvasUserEventProperties) => void;
}

const CanvasProperties: React.FC<ICanvasPropertiesProps> = (props) => {

    const {shape, onPropertiesChange} = props;
    const [borderColor, setBorderColor] = React.useState<string>("#000");

    const onBorderColorChange = (selectedColor: string) => {
        setBorderColor(selectedColor);

        onPropertiesChange({ border_color: selectedColor});
    };

    return (
        <>
            {(shape === Shapes.NONE) ? (
                null
            ) : (
                    <Stack direction="column"
                            alignItems="center"
                            spacing={2} 
                            component={"div"}
                            role="group"
                            aria-label={"Draw atttributes"}>
                        <ColorPicker defaultColor={borderColor}
                                onSelectionChange={onBorderColorChange}/>
                    </Stack>
            )}
        </>
    );
}

export default CanvasProperties;