import * as React from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ColorPicker from "../input/color";
import { IProperties, ShapeTypes } from "../../interfaces";

const DrawCustomizationsContainer = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    position: "absolute",
    top: theme.spacing(1),
    left: theme.spacing(3),
    width: "300px",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
}));

interface IDrawCustomizations {
    shapeType: ShapeTypes;
    onPropertiesChange: (properties: IProperties) => void;
}

const DrawProperties: React.FC<IDrawCustomizations> = (props) => {

    const {shapeType, onPropertiesChange} = props;
    const [borderColor, setBorderColor] = React.useState<string>("#000");

    const onBorderColorChange = (selectedColor: string) => {
        setBorderColor(selectedColor);
        onPropertiesChange({ borderColor: selectedColor});
    };

    return (
        <>
            {(shapeType === ShapeTypes.NONE) ? (
                null
            ) : (
                <DrawCustomizationsContainer square={false} elevation={1}>
                    <Stack direction="column"
                            alignItems="center"
                            spacing={2} 
                            component={"div"}
                            role="group"
                            aria-label={"Draw atttributes"}>
                        <ColorPicker defaultColor={borderColor}
                                onSelectionChange={onBorderColorChange}/>
                    </Stack>
                </DrawCustomizationsContainer>        
            )}
        </>
    );
}

export default DrawProperties;