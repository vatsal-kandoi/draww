import { IAttributeOptions } from "../interfaces/attributeOptions";
import { CanvasActionType } from "../interfaces/enums";
import { EventCaptureManager } from "../structures/event";
import * as React from "react";

const useEventCaptureManager = (selectedCanvasAction: CanvasActionType, attributes: IAttributeOptions) => {
    const [manager, setManager] = React.useState<EventCaptureManager>(new EventCaptureManager(selectedCanvasAction, attributes));

    React.useEffect(() => {
        setManager(new EventCaptureManager(
            selectedCanvasAction,
            attributes
        ));
    }, [selectedCanvasAction, attributes]);
    
    return manager;
}


export default useEventCaptureManager;