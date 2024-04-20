import { Point } from "../base";
import { ShapeTypes } from "../shapes/base";

export enum UserAction {
    SHAPE_CHANGE = "SHAPE_CHANGE",
    SET_USER = "SET_USER",
    SET_CANVAS = "SET_CANVAS",
    MOUSE_MOVE_EVENT = "MOUSE_MOVE_EVENT",
}

export interface IShapeChange {
    action: UserAction;
    shape: ShapeTypes;
}

export interface IUserSet { 
    action: UserAction;
    user_name: string;
}

export interface IInitializeCanvas {
    action: UserAction;
    canvas: OffscreenCanvas;
    dimensions: Point,
}

export interface IMouseMoveEvent {
    action: UserAction;
    point: Point;
    isMouseDown: boolean;
}