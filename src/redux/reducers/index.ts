import { combineReducers } from 'redux';
import canvasActionReducer from "./canvasActionReducer";
import attributeOptionsReducer from "./attributeActionReducer"

const rootReducer = combineReducers({
  selectedCanvasAction: canvasActionReducer,
  attributes: attributeOptionsReducer,
});

export default rootReducer;