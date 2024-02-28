import * as React from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { connect } from "react-redux";
import { useLanguageStore } from "../../hooks/languageprovider";
import { AttributeAction, CanvasActionType } from "../../interfaces/enums";
import ColorPicker from "../input/color";

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
    shapeType: CanvasActionType;
    color: string;
    onColorChange: (color: string) => void;
}

const DrawCustomizations: React.FC<IDrawCustomizations> = (props) => {
    const i18n = useLanguageStore();

    return (
        <>
            {(props.shapeType === CanvasActionType.NONE) ? (
                null
            ) : (
                <DrawCustomizationsContainer square={false} elevation={1}>
                    <Stack direction="column"
                            alignItems="center"
                            spacing={2} 
                            component={"div"}
                            role="group"
                            aria-label={i18n.t("aria_buttons_groups_drawattributes")}>
                        <ColorPicker defaultColor={props.color}
                                onSelectionChange={props.onColorChange}/>
                    </Stack>
                </DrawCustomizationsContainer>        
            )}
        </>
    );
}

const mapStateToProps = (state: any) => ({
    shapeType: state.selectedCanvasAction.activeCanvasActionType,
    color: state.attributes.color
}); 
  
const mapDispatchToProps = (dispatch: any) => ({
    onColorChange: (color: string) => dispatch({ 
        type: AttributeAction.SELECT_COLOR,
        payload: { color }
    }),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(DrawCustomizations);