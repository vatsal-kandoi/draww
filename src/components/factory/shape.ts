import { IAttributeOptions } from "../../interfaces/attributeOptions";
import { ILine, IPoint } from "../../interfaces/shapes";

interface IShapeFactory {
    render: any;
    create: any;
}

class LineFactory implements IShapeFactory {
    
    create = (fromCoords: IPoint, toCoords: IPoint, attributes: IAttributeOptions): ILine => {
        return {
            fromCoords: fromCoords, 
            toCoords: toCoords,
            color: attributes.color,
        }
    }

    render = (line: ILine, context: CanvasRenderingContext2D) => {    
        context.strokeStyle = line.color;
        context.beginPath();
        context.moveTo(line.fromCoords.x, line.fromCoords.y);
        context.lineTo(line.toCoords.x, line.toCoords.y);
        context.closePath();
        context.stroke();           
    }
}

export {LineFactory};