import * as React from "react";
import { useSelector } from "react-redux";
import { IAttributeOptions } from "../../../interfaces/attributeOptions";
import { CanvasActionType } from "../../../interfaces/enums";
import ShapeCaptureManager from "../managers/capture";

const useShapeCaptureManager = (): ShapeCaptureManager | null => {
    const actionType = useSelector((state: any) => state?.selectedCanvasAction?.activeCanvasActionType as CanvasActionType)
    const attributes = useSelector((state: any) => state?.attributes as IAttributeOptions);
    const [manager, setManager] = React.useState<ShapeCaptureManager | null>(null);

    React.useEffect(() => {
        if (actionType === CanvasActionType.NONE) {
            setManager(null);
        } else {
            setManager(new ShapeCaptureManager(
                actionType,
                attributes
            ));
    
        }
    }, [actionType, attributes]);
    
    return manager;
}

export default useShapeCaptureManager;