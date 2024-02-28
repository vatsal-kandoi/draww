import * as React from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from "@mui/material";
import { ArrowBack, PauseCircle, PlayArrow, RotateLeft } from "@mui/icons-material";
import { useLanguageStore } from "../../hooks/languageprovider";

const PlayerActionsBtnContainer = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    position: "absolute",
    top: theme.spacing(1),
    left: `calc(50% - 100px)`,
    width: "200px",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),    
}));

interface IPlayerActions {
    /** Is the player button enabled, and to be highlighted */
    isPlayBtnDisabled: boolean;
    isPlaying: boolean,
    onPlayBtnClick: any,
    onPauseBtnClick: any,
    onRestartBtnClick: any,
    onReturnToMainPageBtnClick: any,
}


const PlayerActions: React.FC<IPlayerActions> = (props) => {
    const i18n = useLanguageStore();

    return (
        <PlayerActionsBtnContainer square={false} elevation={1}>
            <Stack direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1} 
                    component="div"
                    role="group"
                    aria-label={i18n.t("aria_buttons_groups_playeractions")} >
                <Tooltip title={i18n.t((props.isPlayBtnDisabled) ? "aria_buttons_play_disabled" : "aria_buttons_play")}>
                    <IconButton id="actions_play"
                            disabled={props.isPlayBtnDisabled}
                            aria-label={i18n.t((props.isPlayBtnDisabled) ? "aria_buttons_play_disabled" : "aria_buttons_play")}
                            color={(!props.isPlaying) ? "default" : "primary"}
                            onClick={props.onPlayBtnClick}>
                        <PlayArrow />
                    </IconButton>
                </Tooltip>
                <Tooltip title={i18n.t("aria_buttons_pause")}>
                    <IconButton id="actions_pause"
                            aria-label={i18n.t("aria_buttons_pause")}
                            color={(props.isPlaying) ? "default" : "primary"}
                            onClick={props.onPauseBtnClick}>
                        <PauseCircle />
                    </IconButton>
                </Tooltip>
                <Tooltip title={i18n.t("aria_buttons_restart")}>
                    <IconButton id="actions_restart"
                            aria-label={i18n.t("aria_buttons_restart")}
                            onClick={props.onRestartBtnClick}>
                        <RotateLeft />
                    </IconButton>
                </Tooltip>
                <Tooltip title={i18n.t("aria_buttons_goback")}>
                    <IconButton id="actions_goback"
                            aria-label={i18n.t("aria_buttons_goback")}
                            onClick={props.onReturnToMainPageBtnClick}>
                        <ArrowBack />
                    </IconButton>
                </Tooltip>
            </Stack>
        </PlayerActionsBtnContainer>
    );
}

  
export default PlayerActions;