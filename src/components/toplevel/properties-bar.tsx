import * as React from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { connect } from "react-redux";
import { CanvasActionType } from "../../interfaces/enums";
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

const AdditionalPropertiesSelector: React.FC<{selectedCanvasAction: CanvasActionType}> = (props) => {

    return (
        <>
            {(props.selectedCanvasAction === CanvasActionType.NONE) ? (
                <> </>
            ) : (
                <AdditionalPropertiesContainer square={false}>
                    <Stack direction="column"
                            alignItems="center"
                            spacing={2} >
                        <ColorPicker defaultColor="#FFFFFF"
                                onSelectionChange={(newColour: string) => console.log(newColour)}/>
                    </Stack>
                </AdditionalPropertiesContainer>
            )}
        </>
    );
}

const mapStateToProps = (state: any) => ({
    selectedCanvasAction: state.selectedCanvasAction.activeCanvasActionType
}); 
  
export default connect(mapStateToProps)(AdditionalPropertiesSelector);