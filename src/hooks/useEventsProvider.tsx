import { useSearchParams } from "react-router-dom";
import { Event, loadEventsFromJSON } from "../structures/event";
import { useSelector } from "react-redux";
import * as React from "react";

function useEventsProvider (): Event[] {
    const eventsInState: Event[] = useSelector(state => (state as any)?.events?.events);
    const [events, setEvents] = React.useState<Event[]>(eventsInState);
    const [searchParams, setSearchParams] = useSearchParams();

    const url = searchParams.get("url") as string;

    if (url !== "") {
        fetch(url)
        .then(response => response.json())
        .then(data => setEvents(loadEventsFromJSON(data)))
        .catch((err) => console.log(err));    
    }

    return events;
}

export default useEventsProvider;