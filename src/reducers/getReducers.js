import { GET_TITLE } from "../actions/types";
import { GET_ARTICLES } from "../actions/types";

const initialState = {
    titles: [],
    subs: []
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_TITLE:
          return {
            ...state,
            titles: action.payload
          };
          break;
        case GET_ARTICLES:
          return {
            ...state,
            subs: action.payload.subs
          };
          break;
        default:
          return state;
    }
}