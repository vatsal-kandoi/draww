import * as React from "react";
import { DEFAULT_CANVAS_PROPERTIES } from "../interfaces";

const CanvasPropertiesProviderContext = React.createContext({
    borderColor: DEFAULT_CANVAS_PROPERTIES.border_color,
    setBorderColor: (color: string) => {}
});

export default CanvasPropertiesProviderContext;