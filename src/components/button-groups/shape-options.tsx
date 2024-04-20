import * as React from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ModeIcon from '@mui/icons-material/Mode';
import { connect } from "react-redux";
import { Tooltip } from "@mui/material";
import { ShapeTypes, UserAction } from "../../interfaces";

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
    selectedShape: ShapeTypes,
    onShapeSelectionChange: (shape: ShapeTypes) => void;
}> = (props) => {

    const {onShapeSelectionChange, selectedShape} = props;


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
                            onClick={() => onShapeSelectionChange(ShapeTypes.LINE)}
                            aria-label={"pen"}>
                        <ModeIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
        </ShapeOptionsContainer>
    );
}

const mapStateToProps = (state: any) => ({
    selectedShape: state.shape.selectedShape
});
  
const mapDispatchToProps = (dispatch: any) => ({
    onShapeSelectionChange: (shape: ShapeTypes) => {
        dispatch({
            type: UserAction.SHAPE_CHANGE,
            payload: shape
        })
    },
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ShapeOptions);