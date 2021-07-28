import { combineReducers } from "redux";
import authReducer from "./authReducer";
import treasuryReducer from "./treasuryReducer";

export default combineReducers({
  authReducer,
  treasuryReducer,
});
