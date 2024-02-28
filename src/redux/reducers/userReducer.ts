interface IUser {
    user_name: string;
}

const initialState: IUser = {
    user_name: "default"
};
  
const userReducer = (
        state: IUser = initialState, 
        action: {type: string, payload: string}
    ) => {
    switch (action.type) {
        case "SET":
            return { user_name: action.payload };        
      default:
        return state;
    }
};
  
export default userReducer;