import { ADD_NOTIFIATION, REMOVE_NOTIFICATION } from "../types";
const InitialState = {
  notification: [],
};

const HandleNotificationReducer = (state = InitialState, action = {}) => {
  switch (action.type) {
    case ADD_NOTIFIATION:
      return {
        ...state,
        notification: [...state.notification, action.payload],
      };
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    default:
      return state;
  }
};
export default HandleNotificationReducer;
