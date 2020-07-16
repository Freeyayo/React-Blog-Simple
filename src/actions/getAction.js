import { GET_TITLE } from "./types";
import { GET_ARTICLES } from "./types";
import { initialState } from "../reducers/postReducers";

const allArts = [
        {
            id: 0,
            title: "Masonry",
            path: "masonry"
        },
        {
            id: 1,
            title: "Sine Wave"
            ,
            path: "sinewave"
        },
        {
            id: 2,
            title: "Socket Space"
            ,
            path: "socketspace"
        },
        {
            id: 3,
            title: "Snake"
            ,
            path: "snake"
        }
    ];

export const getSubs = () => dispatch => {
    dispatch({
        type: GET_ARTICLES,
        payload: initialState
    })
}

export const getTitle = () => dispatch => {
    dispatch({
        type: GET_TITLE,
        payload: allArts
    })
}