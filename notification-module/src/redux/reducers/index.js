import { combineReducers } from "redux";
import HandleNotificationReducer from "./HandleNotificationReducer";
const rootReducer = combineReducers({
  HandleNotification: HandleNotificationReducer,
});
export default rootReducer;
