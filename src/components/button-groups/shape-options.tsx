import * as React from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ModeIcon from '@mui/icons-material/Mode';
import { Tooltip } from "@mui/material";
import { ShapeTypes } from "../../interfaces";
import { Square } from "@mui/icons-material";

const ShapeOptionsContainer = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    position: "absolute",
    top: theme.spacing(1),
    left: `calc(50% - 50px)`,
    width: "100px",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),    
}));


const ShapeOptions: React.FC<{
    onShapeSelectionChange: (shape: ShapeTypes) => void;
}> = (props) => {

    const {onShapeSelectionChange} = props;
    const [selectedShape, setSelectedShape] = React.useState<ShapeTypes>(ShapeTypes.NONE);

    const onShapeChange = (shape: ShapeTypes) => {
        if (selectedShape === shape) {
            onShapeSelectionChange(ShapeTypes.NONE);
            setSelectedShape(ShapeTypes.NONE);
        } else {
            onShapeSelectionChange(shape);
            setSelectedShape(shape);
        }
    };

    return (
        <ShapeOptionsContainer square={false} 
                elevation={1}>
            <Stack direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1} 
                    component={"div"}
                    role="group"
                    aria-label={"Actions"} >
                <Tooltip title={"Choose Pen"}>
                    <IconButton id="pen"
                            color={(selectedShape === ShapeTypes.LINE) ? "primary" : "default"}
                            onClick={() => onShapeChange(ShapeTypes.LINE)}
                            aria-label={"pen"}>
                        <ModeIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Choose Square"}>
                    <IconButton id="square"
                            color={(selectedShape === ShapeTypes.SQUARE) ? "primary" : "default"}
                            onClick={() => onShapeChange(ShapeTypes.SQUARE)}
                            aria-label={"square"}>
                        <Square />
                    </IconButton>
                </Tooltip>                
            </Stack>
        </ShapeOptionsContainer>
    );
}
  
export default ShapeOptions;