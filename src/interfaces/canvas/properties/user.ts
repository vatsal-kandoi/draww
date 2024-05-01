import { StrokeStyles } from "./stroke";

export interface ICanvasUserEventProperties {
    /** Color assigned to the border strokes */
    border_color: string;
    /** Style of border line */
    stroke_style: StrokeStyles;
}
export const DEFAULT_CANVAS_PROPERTIES: ICanvasUserEventProperties = {
    border_color: "#000",
    stroke_style: StrokeStyles.SOLID,
}