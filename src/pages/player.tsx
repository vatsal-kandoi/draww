import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ThemeToggle from '../components/buttons/theme-toggle';
import LanguageToggle from '../components/buttons/language-toggle';
import { useNavigate, useSearchParams } from "react-router-dom";
import useEventsProvider from '../hooks/useEventsProvider';
import PlayerActionBar from '../components/toplevel/player-actions';
import CanvasBase, { ICanvasRefs } from "../components/canvas/canvas-base";
import useEventsPlayer from '../hooks/playerRenderer';

const ButtonContainer = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),    
}));

const Container = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}));


const PlayerPage: React.FC<{}> = () => {
    const canvasBaseRefs = React.useRef<ICanvasRefs>(null);
    const navigate = useNavigate();
    const [eventLoop, setEventLoopInterval] = React.useState<any>(null);
    const [currEventIndex, setEventIndex] = React.useState<number>(0);
    const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
    const events = useEventsProvider();


    const renderNextEvent = () => {
        setEventIndex((prevEventIndex) => {
            if (canvasBaseRefs.current === null) return prevEventIndex;
            if (prevEventIndex === events.length) {
                pauseEvents();
                return prevEventIndex;
            }
            canvasBaseRefs.current.renderEventOnCanvas(events[prevEventIndex]);
            return prevEventIndex + 1;   
        });        
    }

    useEventsPlayer(events, currEventIndex, isPlaying, renderNextEvent)


    const playEvents = () => {
        setIsPlaying(true)
    }

    const pauseEvents = () => {
        setIsPlaying(false);
    }

    const restartPlayer = () => {
        if (canvasBaseRefs.current === null) return;
        canvasBaseRefs.current.clearCanvas();
        setEventIndex(0);        
    }

    return (
        <>
        <Container elevation={0}>
            <CanvasBase        
                ref={canvasBaseRefs}
                canvasProps={{
                    style: {
                        display: "block"
                    }
                }}        
            />
            <PlayerActionBar 
                isPlaying={isPlaying}
                onPausePressed={pauseEvents}
                onPlayPressed={playEvents} 
                onRestartPressed={restartPlayer}
                onReturnToMainPage={() => {navigate("/home/")}}
                />
            <ButtonContainer square={false} elevation={1}>
                <Stack direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2} >
                    <ThemeToggle />
                    <LanguageToggle />
                </Stack>
            </ButtonContainer>        
        </Container>
        </>
    );
}

  
export default PlayerPage;