import { combineReducers } from "redux";
import postReducer from "./postReducers";
import getReducer from "./getReducers";

export default combineReducers({
    posts : postReducer,
    gets : getReducer
});