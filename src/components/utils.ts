import { EventBase } from "./events/structures/base";
import { exportEventsToJSON, loadEventsFromJSON } from "./events/structures/event";

export function areEventsEqual(eventList: EventBase[], otherEventList: EventBase[]): boolean {
    if (eventList.length !== otherEventList.length) return false;
    return eventList.every((event, index) => event.isEqual(otherEventList[index]));
}

export function onDownloadEvents (events: EventBase[]) {
    const eventsJson = exportEventsToJSON(events);
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(eventsJson));
    const node = document.createElement('a');
    node.setAttribute("href", dataStr);
    node.setAttribute("download", "draww.json");
    node.click();

}

export function onUploadEvents (cb: (events: EventBase[]) => void) {        
    const node = document.createElement('input');
    node.type = "file";
    node.click();

    node.onchange = () => {
        const selectedFiles = node.files;
        if (selectedFiles === null) return;
        const reader = new FileReader(); // built in API

        const onLoad = (ev: any) => {
            const eventsJson = JSON.parse(ev.target.result);
            const data = loadEventsFromJSON(eventsJson);
            cb(data);
        }
        reader.onload = onLoad;
        reader.readAsText(selectedFiles[0]);            
    }
}
