import { CanvasEventType } from "../../interfaces/enums";
import { EventBase } from "../../components/events/structures/event";


interface ICanvasEvents {
    users: string[],
    events: EventBase[],
    deletedEvents: EventBase[],
}

const initialState: ICanvasEvents = {
    users: [],
    events: [],
    deletedEvents: [],
};
  
const canvasEventsReducer = (
        state: ICanvasEvents = initialState, 
        action: {type: CanvasEventType, payload: EventBase}
    ) => {
    let users: string[];       
    switch (action.type) {
        case CanvasEventType.LOAD:
            const events = ( action.payload as any ) as EventBase[];
            users = events.map((ev) => ev.user_name);
            return { ...state, events: action.payload, users: users }
        case CanvasEventType.ADD:
            users = [...state.users];
            users.push(action.payload.user_name)
            return { ...state, events: [...state.events, action.payload], users: users }
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