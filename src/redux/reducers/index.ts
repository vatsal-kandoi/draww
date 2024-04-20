import { combineReducers } from 'redux';
import selectedShapeReducer from "./shape";

const rootReducer = combineReducers({
    shape: selectedShapeReducer,
});

export default rootReducer;