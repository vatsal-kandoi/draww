import { ShapeTypes, UserAction } from "../../interfaces";

const initialState = {
    selectedShape: ShapeTypes.NONE,
};
  
const canvasActionReducer = (
        state: { selectedShape: ShapeTypes }= initialState, 
        action: {
            type: UserAction,
            payload: ShapeTypes,
        },
    ) => {
    switch(action.type) {
        case (UserAction.SHAPE_CHANGE): {
            if (state.selectedShape === action.payload) return { ...state, selectedShape: ShapeTypes.NONE };
            return { ...state, selectedShape: action.payload };        
        }
        default: {
            return state
        }
    }
};
  
export default canvasActionReducer;