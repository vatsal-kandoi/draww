import { CanvasEventType } from "../../interfaces/enums";
import { EventBase } from "../../components/events/structures/event";


interface ICanvasEvents {
    lastAction: CanvasEventType,
    events: EventBase[],
}

const initialState: ICanvasEvents = {
    lastAction: CanvasEventType.NONE,
    events: [],
};
  
const canvasEventsReducer = (
        state: ICanvasEvents = initialState, 
        action: {type: CanvasEventType, payload: EventBase}
    ) => {
    switch (action.type) {
        case CanvasEventType.LOAD:
            return { ...state, events: action.payload, lastAction: action.type }
        case CanvasEventType.ADD:
            return { ...state, events: [...state.events, action.payload], lastAction: action.type }
        case CanvasEventType.DELETE: 
            return { ...state, events: state.events.filter(event => event.event_name !== action.payload.event_name), lastAction: action.type }
        case CanvasEventType.CLEAR_ALL:
            return { ...initialState, lastAction: action.type }
      default:
        return state;
    }
};
  
export default canvasEventsReducer