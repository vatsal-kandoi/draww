export enum Languages {
    EN = "English",
}

export enum Themes {
    LIGHT = "light", 
    DARK = "dark",
}

export enum Shape { 
    LINE = "LINE"
}

export enum CanvasActionType {
    NONE,
    PEN,
    SQUARE
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
}