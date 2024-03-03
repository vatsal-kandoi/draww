import { RefObject } from "react";
import { Languages } from "../interfaces/enums";
import { EventBase } from "./events/structures/base";
import { exportEventsToJSON, loadEventsFromJSON } from "./events/structures/event";
import { IPoint } from "../interfaces";

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

export function getLanguageName(code: Languages) {
    if (code === Languages.EN) {
        return "English";
    } else if (code === Languages.ESP) {
        return "Espanol"
    }
    return "English";    
}

export function getLanguageCode(language: string) {
    if (language === "English") {
        return Languages.EN;
    } else if (language === "Espanol") {
        return Languages.ESP;
    }
    return Languages.EN;
}

export function setCanvasSizesToMax(canvasRef: RefObject<HTMLCanvasElement>) {
    if (canvasRef.current === null) return;

    canvasRef.current.style.width ='100%';
    canvasRef.current.style.height='100%';
    canvasRef.current.style.margin = "0px";
    canvasRef.current.style.padding = "0px";

    canvasRef.current.width  = canvasRef.current.offsetWidth;
    canvasRef.current.height = canvasRef.current.offsetHeight;
}

export function abs(num: number): number {
    if (num < 0) return num * -1;
    return num;
}

export function max(num1: number, num2: number): number {
    if (num1 > num2) return num1;
    return num2;
}

export function min(num1: number, num2: number): number {
    if (num1 < num2) return num1;
    return num2;
}

export function getCanvasDimensions(canvasRef: HTMLCanvasElement): IPoint {
    return {
        x: canvasRef.offsetWidth,
        y: canvasRef.offsetHeight
    }
}

export function normalizeCoordinates(coords: IPoint, currentDimensions: IPoint, captureDimensions: IPoint): IPoint {
    if (currentDimensions === captureDimensions) return coords;    

    return {
        x: ( coords.x / captureDimensions.x ) * currentDimensions.x,
        y: ( coords.y / captureDimensions.y ) * currentDimensions.y
    }
}

export function distance(pointA: IPoint, pointB: IPoint) {
    return (
        (pointA.x - pointB.x) ** 2 + 
        (pointA.y - pointB.y) ** 2        
    ) ** 0.5;
}