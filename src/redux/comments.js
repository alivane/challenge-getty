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
            return {...state, comments: state.comments.concat(comments)}
        case ActionTypes.REMOVE_COMMENT:
            return {...state, isLoading: false, errMess: null,  comments: state.comments.filter(comment => comment.id !== action.id )};
        case ActionTypes.UPDATE_COMMENT:
            state.comments.filter((data, index) => {
                if(data.id === action.payload.id) {
                   return ( state.comments.reduce((prev, current)=> {
                        prev.comments[index] = action.payload;
                        return prev;
                    }, state))
                }
            })
            return {...state, isLoading: false, errMess: null}
        default:
            return state;
    }
}