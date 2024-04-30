import { IUserEventJSON, UserCanvasActionType} from "../../interfaces";

const initialState = {
    events: []
};
  
const eventsReducer = (
        state: { events: IUserEventJSON[] }= initialState, 
        action: {
            type: UserCanvasActionType,
            payload: IUserEventJSON | IUserEventJSON[],
        },
    ) => {
    switch(action.type) {
        case (UserCanvasActionType.CANVAS_EVENTS_ADDED): {
            return { 
                ...state, 
                events: [
                    // Handle event updates due to drags
                    ...state.events.filter((event) => event.event_name !== (action.payload as IUserEventJSON).event_name), 
                    (action.payload as IUserEventJSON) 
                ]
            };
        }
        default: {
            return state
        }
    }
};
  
export default eventsReducer;