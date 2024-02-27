import * as React from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { useLanguageStore } from "../../hooks/languageprovider";
import { ArrowBack, PauseCircle, PlayArrow, RotateLeft } from "@mui/icons-material";

const ButtonStack = styled(Paper)(({ theme }) => ({
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


const PlayerActionBar: React.FC<{
    isPlaying: boolean,
    onPlayPressed: any,
    onPausePressed: any,
    onRestartPressed: any,
    onReturnToMainPage: any,
}> = (props) => {
    const i18n = useLanguageStore();

    return (
        <ButtonStack square={false} elevation={1}>
            <Stack direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1} >
                <IconButton id="actions_play"
                        color={(!props.isPlaying) ? "default" : "primary"}
                        onClick={props.onPlayPressed}>
                    <PlayArrow />
                </IconButton>
                <IconButton id="actions_pause"
                        color={(props.isPlaying) ? "default" : "primary"}
                        onClick={props.onPausePressed}>
                    <PauseCircle />
                </IconButton>
                <IconButton id="actions_restart"
                        onClick={props.onRestartPressed}>
                    <RotateLeft />
                </IconButton>
                <IconButton id="actions_goback"
                        onClick={props.onReturnToMainPage}>
                    <ArrowBack />
                </IconButton>
            </Stack>
        </ButtonStack>
    );
}

  
export default PlayerActionBar;