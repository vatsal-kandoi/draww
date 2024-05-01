import * as React from "react";
import { DEFAULT_CANVAS_PROPERTIES, ICanvasUserEventProperties } from "../interfaces";

/**
 * Custom hook to provide the context values for the canvas
 * properties forms
 */
function useCanvasPropertiesProvider() {
    const [properties, setProperties] = React.useState<ICanvasUserEventProperties>(DEFAULT_CANVAS_PROPERTIES);

    const contextValue = {
        borderColor: properties.border_color,
        setBorderColor: (color: string) => {
            setProperties((prev) => { 
                return {...prev, border_color: color}; 
            });
        }
    }
 
    return { contextValue, properties: properties };
}

export default useCanvasPropertiesProvider;