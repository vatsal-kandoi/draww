import * as React from "react";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ModeIcon from '@mui/icons-material/Mode';
import { Tooltip } from "@mui/material";
import { Square } from "@mui/icons-material";
import { Shapes } from "../../../interfaces";


const CanvasShapeOptions: React.FC<{
    /** Current selected shape by the user */
    shape: Shapes;
    /** Handler to be called on shape change */
    onShapeChange: (shape: Shapes) => void;    
}> = (props) => {
    const {shape, onShapeChange} = props;

    const onChange = (shape: Shapes) => {
        onShapeChange(shape);
    }

    return (
            <Stack direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1} 
                    component={"div"}
                    role="group"
                    aria-label={"Actions"} >
                <Tooltip title={"Choose Pen"}>
                    <IconButton id="pen"
                            color={(shape === Shapes.PEN) ? "primary" : "default"}
                            onClick={() => onChange(shape === Shapes.PEN ? Shapes.NONE : Shapes.PEN)}
                            aria-label={"pen"}>
                        <ModeIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Choose Square"}>
                    <IconButton id="square"
                            color={(shape === Shapes.SQUARE) ? "primary" : "default"}
                            onClick={() => onChange(shape === Shapes.SQUARE ? Shapes.NONE : Shapes.SQUARE)}
                            aria-label={"square"}>
                        <Square />
                    </IconButton>
                </Tooltip>                
            </Stack>
    );
}
  
export default CanvasShapeOptions;