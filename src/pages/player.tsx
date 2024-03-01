import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box } from '@mui/material';
import CanvasBase, { ICanvasRefs } from "../components/canvas/canvas-base";
import useTimer from '../hooks/timer';
import PageActions from '../components/button-groups/page-actions';
import useEventsProvider from '../hooks/eventsProvider';
import PlayerActionBar from "../components/button-groups/player-actions";

const PageActionsBtnContainer = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(3), 
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
    const navigate = useNavigate();
    const searchParams = useSearchParams();
    const canvasBaseRefs = React.useRef<ICanvasRefs>(null);
    const [currEventIndex, setEventIndex] = React.useState<number>(0);
    const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
    const events = useEventsProvider(searchParams[0].get("url") as string);

    const renderNextEvent = () => {
        setEventIndex((prevEventIndex) => {
            if (canvasBaseRefs.current === null) return prevEventIndex;
            canvasBaseRefs.current.renderEventOnCanvas(events[prevEventIndex]);
            return prevEventIndex + 1;   
        });        
    }

    const shouldContinue = () => { return currEventIndex < events.length && isPlaying; }

    useTimer(currEventIndex, isPlaying, shouldContinue, renderNextEvent, () => {setIsPlaying(false)});

    const restartPlayer = () => {
        if (canvasBaseRefs.current === null) return;
        canvasBaseRefs.current.clearCanvas();
        setEventIndex(0);        
    }

    const playEvents = () => {
        if (currEventIndex >= events.length) return;
        setIsPlaying(true);
    }

    return (
        <>
            <Container elevation={0}>
                <CanvasBase        
                    ref={canvasBaseRefs}
                />
                <PlayerActionBar 
                    isPlaying={isPlaying}
                    isPlayBtnDisabled={currEventIndex === events.length}
                    onPlayBtnClick={playEvents}
                    onPauseBtnClick={() => setIsPlaying(false)} 
                    onRestartBtnClick={restartPlayer}
                    onReturnToMainPageBtnClick={() => {navigate("/home/")}}
                    />

                <PageActionsBtnContainer>
                    <PageActions showEventsDownloadBtn={false}
                            showEventsUploadBtn={false} />
                </PageActionsBtnContainer>        
            </Container>
        </>
    );
}

  
export default PlayerPage;