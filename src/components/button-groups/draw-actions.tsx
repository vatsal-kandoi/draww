import * as React from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ModeIcon from '@mui/icons-material/Mode';
import { connect } from "react-redux";
import { useLanguageStore } from "../../hooks/languageprovider";
import {CanvasActionSelectionType, CanvasActionType} from "../../interfaces/enums";
import { Tooltip } from "@mui/material";

const DrawActionsBtnContainer = styled(Paper)(({ theme }) => ({
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


const DrawActions: React.FC<{selectedCanvasAction: CanvasActionType, onSelectionChange: any}> = (props) => {
    const i18n = useLanguageStore();

    const onClick = (canvasAction: CanvasActionType, isSelected: Boolean) => {
        if (isSelected) {
            props.onSelectionChange(CanvasActionSelectionType.DESELECT, CanvasActionType.NONE)
        } else {
            props.onSelectionChange(CanvasActionSelectionType.SELECT, canvasAction)
        }
    }

    return (
        <DrawActionsBtnContainer square={false} 
                elevation={1}>
            <Stack direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1} 
                    component={"div"}
                    role="group"
                    aria-label={i18n.t("aria_buttons_groups_drawactions")} >
                <Tooltip title={i18n.t("aria_buttons_pen")}>
                    <IconButton id="pen"
                            color={(props.selectedCanvasAction === CanvasActionType.PEN) ? "primary" : "default"}
                            onClick={() => onClick(CanvasActionType.PEN, props.selectedCanvasAction === CanvasActionType.PEN)}
                            aria-label={i18n.t("aria_buttons_pen")}>
                        <ModeIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
        </DrawActionsBtnContainer>
    );
}

const mapStateToProps = (state: any) => ({
    selectedCanvasAction: state.selectedCanvasAction.activeCanvasActionType
});
  
const mapDispatchToProps = (dispatch: any) => ({
    onSelectionChange: (selectionType: CanvasActionSelectionType, actionType: CanvasActionType ) => dispatch({ 
        type: selectionType,
        payload: actionType
    }),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(DrawActions);