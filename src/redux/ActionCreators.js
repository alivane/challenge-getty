import * as ActionTypes from './ActionTypes';

const urlComments = 'http://localhost:3001/';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (name, comment) => (dispatch) => {
    const newComment = {
        name: name,
        comment: comment
    };

    return fetch(urlComments + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};


export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
})

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})

export const fetchComments = () => (dispatch) => {
    dispatch(commentsLoading(true));
    return fetch(urlComments + 'comments')
        .then(response =>{
            if(response.ok) {
                return response
            }else {
                var error = new Error("Error " + response.status + ": " + response.statusText);
                error.response = response;
                throw error
            }
        }, error => {
            var errmess = new Error(error.message);
            throw errmess
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsLoading = () => ({
    type: ActionTypes.COMMENTS_LOADING
})
