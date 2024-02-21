import * as React from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { connect } from "react-redux";
import { CanvasActionType, AttributeAction } from "../../interfaces/enums";
import ColorPicker from "../input/color";

const AdditionalPropertiesContainer = styled(Paper)(({ theme }) => ({
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

const AdditionalPropertiesSelector: React.FC<{
    selectedCanvasAction: CanvasActionType
    onSelectedColorChange: any,
    selectedColor: string,
}> = (props) => {

    return (
        <>
            {(props.selectedCanvasAction === CanvasActionType.NONE) ? (
                <> </>
            ) : (
                <AdditionalPropertiesContainer square={false} elevation={1}>
                    <Stack direction="column"
                            alignItems="center"
                            spacing={2} >
                        <ColorPicker defaultColor={props.selectedColor}
                                onSelectionChange={props.onSelectedColorChange}/>
                    </Stack>
                </AdditionalPropertiesContainer>
            )}
        </>
    );
}

const mapStateToProps = (state: any) => ({
    selectedCanvasAction: state.selectedCanvasAction.activeCanvasActionType,
    selectedColor: state.attributes.color
}); 
  
const mapDispatchToProps = (dispatch: any) => ({
    onSelectedColorChange: (color: string) => dispatch({ 
        type: AttributeAction.SELECT_COLOR,
        payload: { color }
    }),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(AdditionalPropertiesSelector);