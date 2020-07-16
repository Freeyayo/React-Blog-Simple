import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

const initialState = {};

const middleWare = [thunk];

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store = createStore(
    rootReducer, 
    initialState,
 //    composeEnhancers(
	//     applyMiddleware(...middleWare)
	// )
    applyMiddleware(...middleWare)
);

export default store;