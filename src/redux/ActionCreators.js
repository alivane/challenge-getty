import * as ActionTypes from './ActionTypes';

const urlComments = 'http://localhost:3001/';

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

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = ({name, comment}) => (dispatch) => {
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


export const removeComment = (id) => ({
    type: ActionTypes.REMOVE_COMMENT,
    id: id
})

export const deleteComment = (id) => (dispatch) => {
    return fetch(urlComments + 'comments/' + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
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
      .then(response => dispatch(removeComment(id)))
      .catch(error =>  { console.log('delete comments', error.message)});
};

export const updateComment = ({id, name, comment}) => ({
    type: ActionTypes.UPDATE_COMMENT,
    payload: {
        id: id,
        name: name,
        comment: comment
    }
})

export const updateCommentData = (id, name, comment) => (dispatch) => {
    const dataComment = {
        id: id,
        name: name,
        comment: comment
    }
    return fetch(urlComments + 'comments/' + id, {
        method: "PUT",
        body: JSON.stringify(dataComment),
        headers: {
          "Content-Type": "application/json"
        }
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
      .then(response => dispatch(updateComment(dataComment)))
      .catch(error =>  { console.log('update comments', error.message)});
};