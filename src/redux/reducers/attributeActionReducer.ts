import { IAttributeOptions, AttributeChange } from "../../interfaces/attributeOptions";
import { AttributeAction } from "../../interfaces/enums";

const initialState: IAttributeOptions = {
    color: "#FFF888"
};
  
const attributeOptionsReducer = (
        state: IAttributeOptions = initialState, 
        action: {type: AttributeAction, payload: AttributeChange}
    ) => {
    switch (action.type) {
      case AttributeAction.SELECT_COLOR:
        return { color: action.payload.color};
      default:
        return state;
    }
};
  
export default attributeOptionsReducer