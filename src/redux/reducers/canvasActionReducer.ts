import {CanvasActionSelectionType, CanvasActionType} from "../../interfaces/enums";

const initialState = {
    activeCanvasActionType: CanvasActionType.NONE
};
  
const canvasActionReducer = (
        state: {activeCanvasActionType: CanvasActionType} = initialState, 
        action: {type: CanvasActionSelectionType, payload: CanvasActionType}
    ) => {
    switch (action.type) {
      case CanvasActionSelectionType.SELECT:
        return { activeCanvasActionType: action.payload};
      case CanvasActionSelectionType.DESELECT:
        return { activeCanvasActionType: CanvasActionType.NONE };
      default:
        return state;
    }
};
  
export default canvasActionReducer