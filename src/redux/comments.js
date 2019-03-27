import * as ActionTypes from './ActionTypes';

export const Comments = (state = {
    errMess: null,
    comments: []
}, action) => {
    switch(action.type) {
        case ActionTypes.COMMENTS_LOADING:
            return {...state, isLoading: true, errMess: null, comments: action.payload}
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading: false, errMess: null, comments: action.payload}
        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, comments: []}
        case ActionTypes.ADD_COMMENT:
            var comments = action.comments.payload
            return {...state, comments: state.comments.concat(comments)};
        default:
            return state;
    }
}