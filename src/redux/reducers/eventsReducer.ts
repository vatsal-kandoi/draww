import { CanvasEventType } from "../../interfaces/enums";
import { Event } from "../../structures/event";


interface ICanvasEvents {
    users: Set<string>,
    events: Event[],
    deletedEvents: Event[],
}

const initialState: ICanvasEvents = {
    users: new Set(),
    events: [],
    deletedEvents: [],
};
  
const canvasEventsReducer = (
        state: ICanvasEvents = initialState, 
        action: {type: CanvasEventType, payload: Event}
    ) => {
    let users: Set<string>;       
    switch (action.type) {
        case CanvasEventType.LOAD:
            const events = ( action.payload as any ) as Event[];
            users = new Set(events.map((ev) => ev.user_name));
            return { ...state, events: action.payload, users: users }
        case CanvasEventType.ADD:
            users = state.users;
            users.add(action.payload.user_name)
            return { ...state, events: [...state.events, action.payload], users }
        case CanvasEventType.DELETE: 
            return { ...state, events: state.events.filter(event => event.event_name !== action.payload.event_name), deletedEvents: [action.payload] }
        case CanvasEventType.DELETE_CONFIRMED: 
            return { ...state, deletedEvents: [] }
        case CanvasEventType.CLEAR_ALL:
            return initialState
      default:
        return state;
    }
};
  
export default canvasEventsReducer