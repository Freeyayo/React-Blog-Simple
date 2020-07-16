import { FETCH_POST, NEW_POST , ADD_SUBS , UPDATE_SUB_STATUS } from "./types";

export const fetchPosts = () => dispatch => {
    fetch("http://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(posts => {
                dispatch({
                    type: FETCH_POST,
                    payload: posts
                })
            }
        )
}

export const createPost = () => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: NEW_POST,
                payload: json
            })
        })
}

export const addSubs = (sub) => dispatch => {
    dispatch({
        type: ADD_SUBS,
        payload: sub
    })
}

export const updateSubSatus = (sub) => dispatch => {
    dispatch({
        type: UPDATE_SUB_STATUS,
        payload: sub
    })
}