import { combineReducers } from "redux";
import AuthReducer from "./slices/AuthSlice";
import DietitianReducer from "./slices/DietitainSlice";

const rootReducer = combineReducers({
  auth: AuthReducer,
  dietitians: DietitianReducer,
});

export default rootReducer;
