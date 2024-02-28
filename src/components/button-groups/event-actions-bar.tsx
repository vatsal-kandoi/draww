import * as React from "react";
import Stack from '@mui/material/Stack';
import { Box, Tooltip } from "@mui/material";
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { I18n } from "i18n-js";

const EventActionsBtnContainer = styled(Stack)(({ theme }) => ({
    ...theme.typography.body2,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
}));


const EventActionsBar: React.FC<{
    i18n: I18n;
    onPlayEventsBtnClick: () => void;
    onDeleteAllEventsBtnClick: () => void;
}> = (props) => {

    return (
        <EventActionsBtnContainer direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2} >
            <Box component={"div"}
                    aria-hidden={true}>
                <h3>{props.i18n.t("messages_events")}</h3>
            </Box>
            <Stack direction="row" 
                    justifyContent="flex-end" 
                    alignItems="center" 
                    component={"div"}
                    role="group"
                    aria-label={props.i18n.t("aria_buttons_groups_eventactions")}>
                <Tooltip title={props.i18n.t("aria_buttons_events_gotoplayer")}>
                    <IconButton id="actions_play_events"
                            size="small"
                            onClick={props.onPlayEventsBtnClick}
                            aria-label={props.i18n.t("aria_buttons_events_gotoplayer")}>
                        <PlayArrow />
                    </IconButton>                        
                </Tooltip>
                <Tooltip title={props.i18n.t("aria_buttons_events_deleteall")}>
                    <IconButton size="small" 
                            id="actions_delete_all_events"
                            onClick={props.onDeleteAllEventsBtnClick}
                            aria-label={props.i18n.t("aria_buttons_events_deleteall")}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
        </EventActionsBtnContainer>

    );
}

export default EventActionsBar;