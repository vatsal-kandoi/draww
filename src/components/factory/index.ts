import { IAttributeOptions } from "../../interfaces/attributeOptions";
import { CanvasActionType } from "../../interfaces/enums";
import { ILine, IPoint } from "../../interfaces/shapes";
import { LineFactory } from "./shape";

const renderObjectOntoCanvas = (
    actionType: CanvasActionType,
    fromCoords: IPoint, 
    toCoords: IPoint, 
    attributes: IAttributeOptions, 
    context: CanvasRenderingContext2D
) => {
    if (actionType === CanvasActionType.PEN) {
        const lf = new LineFactory()
        const line = lf.create(fromCoords, toCoords, attributes);
        lf.render(line, context);
        return line;
    }
    return null
}

export { renderObjectOntoCanvas }; 