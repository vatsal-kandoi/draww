import { combineReducers } from 'redux';
import canvasActionReducer from "./canvasActionReducer";
import attributeOptionsReducer from "./attributeActionReducer"
import canvasEventsReducer from './eventsReducer';
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  selectedCanvasAction: canvasActionReducer,
  attributes: attributeOptionsReducer,
  events: canvasEventsReducer,
  user: userReducer,
});

export default rootReducer;