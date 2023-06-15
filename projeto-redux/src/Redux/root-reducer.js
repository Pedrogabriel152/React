import { combineReducers } from "redux";
import userSlice from "./User/slice";

export default combineReducers({
    user: userSlice
});