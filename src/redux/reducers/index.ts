import { combineReducers } from 'redux';
import canvasActionReducer from "./canvasActionReducer";
import attributeOptionsReducer from "./attributeActionReducer"
import canvasEventsReducer from './eventsReducer';

const rootReducer = combineReducers({
  selectedCanvasAction: canvasActionReducer,
  attributes: attributeOptionsReducer,
  events: canvasEventsReducer
});

export default rootReducer;