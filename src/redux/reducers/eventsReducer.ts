import { CanvasEventType } from "../../interfaces/enums";
import { Event } from "../../structures/event";


interface ICanvasEvents {
    events: Event[],
    deletedEvents: Event[],
}

const initialState: ICanvasEvents = {
    events: [],
    deletedEvents: [],
};
  
const canvasEventsReducer = (
        state: ICanvasEvents = initialState, 
        action: {type: CanvasEventType, payload: Event}
    ) => {
    switch (action.type) {
        case CanvasEventType.LOAD:
            return { ...state, events: action.payload }
        case CanvasEventType.ADD:
            return { ...state, events: [...state.events, action.payload] }
        case CanvasEventType.DELETE: 
            return { ...state, events: state.events.filter(event => event.event_name !== action.payload.event_name), deletedEvents: [action.payload] }
        case CanvasEventType.DELETE_CONFIRMED: 
            return { ...state, deletedEvents: [] }
      default:
        return state;
    }
};
  
export default canvasEventsReducer