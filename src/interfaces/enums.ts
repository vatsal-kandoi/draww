export enum Languages {
    EN = "en",
    ESP = "esp"
}

export enum Themes {
    LIGHT = "light", 
    DARK = "dark",
}

export enum Shape { 
    LINE = "LINE",
    SQUARE = "SQUARE"
}

export enum CanvasActionType {
    NONE = "NONE",
    PEN = "Pen",
    SQUARE = "Square"
}

export enum CanvasActionSelectionType {
    SELECT = "SELECT",
    DESELECT = "DESELECT"
}

export enum AttributeAction {
    SELECT_COLOR = "SELECT_COLOR",
    NONE = "NONE"
}

export enum CanvasEventType {
    ADD = "ADD",
    DELETE = "DELETE",
    DELETE_CONFIRMED = "DELETE_CONFIRMED",
    LOAD = "LOAD",
    CLEAR_ALL = "CLEAR_ALL"
}