import { EventBase } from "./events/structures/base";

export function areEventsEqual(eventList: EventBase[], otherEventList: EventBase[]): boolean {
    if (eventList.length !== otherEventList.length) return false;
    return eventList.every((event, index) => event.isEqual(otherEventList[index]));
}