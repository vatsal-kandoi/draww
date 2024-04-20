import { ShapeTypes, EventJSONBase, UserAction } from "../../interfaces";

const initialState = {
    events: []
};
  
const eventsReducer = (
        state: { events: EventJSONBase[] }= initialState, 
        action: {
            type: UserAction,
            payload: EventJSONBase | EventJSONBase[],
        },
    ) => {
    switch(action.type) {
        case (UserAction.NEW_EVENT_ADDED): {
            return { ...state, events: [...state.events, (action.payload as EventJSONBase) ]}
        }
        default: {
            return state
        }
    }
};
  
export default eventsReducer;