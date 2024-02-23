import { CanvasEventType } from "../../interfaces/enums";
import { IEvent } from "../../interfaces/events";

interface ICanvasEvent extends IEvent {}

interface ICanvasEvents {
    events: ICanvasEvent[],
    eventsToBeRemoved: ICanvasEvent[],
}

const initialState: ICanvasEvents = {
    events: [],
    eventsToBeRemoved: [],
};
  
const canvasEventsReducer = (
        state: ICanvasEvents = initialState, 
        action: {type: CanvasEventType, payload: ICanvasEvent | string}
    ) => {
    switch (action.type) {
        case CanvasEventType.ADD:
            return { events: [ ...state.events, action.payload, ] }
        case CanvasEventType.DELETE: 
            return { events: state.events.filter((ev) => ev.event_id !==  action.payload ), eventsToBeRemoved: state.events.filter((ev) => ev.event_id ===  action.payload ) }
        case CanvasEventType.DELETE_CONFIRMED: 
            return { ...state, eventsToBeRemoved: [] }
      default:
        return state;
    }
};
  
export default canvasEventsReducer