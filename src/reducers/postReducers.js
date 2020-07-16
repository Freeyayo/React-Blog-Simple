import { FETCH_POST, NEW_POST , ADD_SUBS , UPDATE_SUB_STATUS } from "../actions/types";

export const initialState = {
    items : [],
    item: {},
    subs: []
}

const newSubs = [];

export default function(state = initialState, action){
    switch(action.type){
        case FETCH_POST:
          return {
            ...state,
            items: action.payload
          };
          break;
        case NEW_POST:
          return {
            ...state,
            item: action.payload
          }
          break;
        case ADD_SUBS:
          //state.subs.push(action.payload);
          newSubs.push(action.payload);
          return {
            ...state,
            subs: [...newSubs]
          }
          break;
        case UPDATE_SUB_STATUS:
          return {
            ...state,
            subs: action.payload
          }
          break;
        default:
          return state;
    }
}