import * as React from "react";
import { Event } from "../structures/event";

const useEventsPlayer = (events: Event[], currEventIndex: number, isPlaying: boolean, renderNextEvent: () => void) => {

    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (!isPlaying) return;
            if (currEventIndex >= events.length) return;
            renderNextEvent();
        }, 500);

        return () => {
            clearTimeout(timer);
        }
    }, [isPlaying, currEventIndex]);
}

export default useEventsPlayer;