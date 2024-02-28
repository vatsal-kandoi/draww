import { EventBase, loadEventsFromJSON } from "../components/events/structures/event";
import { useSelector } from "react-redux";
import * as React from "react";

function useEventsProvider (url: string): EventBase[] {
    const eventsInState: EventBase[] = useSelector(state => (state as any)?.events?.events);
    const [events, setEvents] = React.useState<EventBase[]>(eventsInState);

    if (url !== "") {
        fetch(url)
        .then(response => response.json())
        .then(data => setEvents(loadEventsFromJSON(data)))
        .catch((err) => console.log(err));    
    }

    return events;
}

export default useEventsProvider;