import { combineReducers } from "redux";
import AuthReducer from "./slices/AuthSlice";
import DietitianReducer from "./slices/DietitainSlice";
import PaginationReducer from "./slices/PaginationSlice";
import UserReducer from "./slices/UserSlice";

const rootReducer = combineReducers({
  auth: AuthReducer,
  dietitians: DietitianReducer,
  pagination: PaginationReducer,
  user: UserReducer,
});

export default rootReducer;
