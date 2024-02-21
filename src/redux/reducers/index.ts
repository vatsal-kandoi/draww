import { combineReducers } from 'redux';
import canvasActionReducer from "./canvasActionReducer";


const rootReducer = combineReducers({
  selectedCanvasAction: canvasActionReducer,
  // Add other reducers here if you have more
});

export default rootReducer;