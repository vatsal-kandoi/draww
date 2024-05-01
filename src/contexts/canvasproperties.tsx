import * as React from "react";
import { DEFAULT_CANVAS_PROPERTIES, StrokeStyles } from "../interfaces";

const CanvasPropertiesProviderContext = React.createContext({
    borderColor: DEFAULT_CANVAS_PROPERTIES.border_color,
    setBorderColor: (color: string) => {},
    strokeStyle: DEFAULT_CANVAS_PROPERTIES.stroke_style,
    setStrokeStyle: (style: StrokeStyles) => {},
});

export default CanvasPropertiesProviderContext;