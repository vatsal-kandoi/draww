import { Point } from "../base";
import { EventJSONBase } from "../events/base";
import { ShapeTypes } from "../shapes/base";

export enum UserAction {
    SHAPE_CHANGE = "SHAPE_CHANGE",
    INIT_USER = "INIT_USER",
    INIT_CANVAS = "INIT_CANVAS",
    INIT_TEMPORARY_CANVAS = "INIT_TEMPORARY_CANVAS",
    MOUSE_MOVE_EVENT = "MOUSE_MOVE_EVENT",
    LOAD_EVENTS = "LOAD_EVENTS",
    DELETE_ALL_EVENTS = "DELETE_ALL_EVENTS",
    NEW_EVENT_ADDED = "NEW_EVENT_ADDED",
}

export interface IShapeChange {
    action: UserAction;
    shape: ShapeTypes;
}

export interface IInitUser { 
    action: UserAction;
    user_name: string;
}

export interface IInitCanvas {
    action: UserAction;
    canvas: OffscreenCanvas;
    dimensions: Point,
}

export interface IInitTemporaryCanvas {
    action: UserAction;
    canvas: OffscreenCanvas;
    dimensions: Point,
}

export interface IMouseMoveEvent {
    action: UserAction;
    point: Point;
    isMouseDown: boolean;
}

export interface INewEvent {
    event: EventJSONBase;
}