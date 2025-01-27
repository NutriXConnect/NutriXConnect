import { combineReducers } from "redux";
import AuthReducer from "./slices/AuthSlice";
import DietitianReducer from "./slices/DietitainSlice";
import PaginationReducer from "./slices/PaginationSlice";

const rootReducer = combineReducers({
  auth: AuthReducer,
  dietitians: DietitianReducer,
  pagination: PaginationReducer,
});

export default rootReducer;
