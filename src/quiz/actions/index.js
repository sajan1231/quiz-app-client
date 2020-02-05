export function handleCreateQuiz(url, token, data, history) {
  return dispatch => {
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch({
            type: 'CREATE_QUIZ',
            payload: data.question
          });
          history.push('/');
        } else if (!data.success) {
          dispatch({
            type: 'QUIZ_ERROR',
            payload: data.massage
          });
          console.log('create quiz unsuccessfull...');
        }
      })
      .catch(err => {
        dispatch({
          type: 'QUIZ_ERROR',
          payload: 'something went wrong. sorry for the trouble.'
        });
        console.log(err, 'question post catch err...');
      });
  }
}


export function handleQuizUpdate(url, token, data, id, history) {
  return dispatch => {
    fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch({
            type: 'UPDATE_QUIZ',
            payload: data.question
          });

          history.push('/');
        } else if (!data.success) {
          console.log('quiz update unsuccessfull...');
          dispatch({
            type: 'QUIZ_ERROR',
            payload: data.massage
          });
        }
      })
      .catch(err => {
        dispatch({
          type: 'QUIZ_ERROR',
          payload: 'something went wrong. sorry for the trouble.'
        });
        console.log(err, 'update quiz catch err...');
      });
  }
}

export function handleFetchQuizzes(url, token) {
  return dispatch => {
    fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch({
            type: 'GET_QUIZZES',
            payload: data.questions.reverse()
          });
        } else if (!data.success) {
          dispatch({
            type: 'QUIZ_ERROR',
            payload: data.massage
          });
          console.log(data.message, 'error getting quizzes...');
        }
      })
      .catch(err => {
        dispatch({
          type: 'QUIZ_ERROR',
          payload: 'something went wrong. sorry for the trouble.'
        });
        console.log(err, 'fetch quiz error...');
      });
  }
}

export function handleUpdateScore(url, token, score) {
  return dispatch => {
    fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify(score)
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch({
            type: 'UPDATE_USER',
            payload: data
          });
        } else if (!data.success) {
          dispatch({
            type: 'QUIZ_ERROR',
            payload: data.massage
          });
          console.log(data, 'update score failed...');
        }
      })
      .catch(err => {
        dispatch({
          type: 'QUIZ_ERROR',
          payload: 'something went wrong. sorry for the trouble.'
        });
        console.log(err, 'update score catch error...');
      });
  }
};

export function deleteQuiz(url, token, id, history) {
  return dispatch => {
    fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch({
            type: 'DELETE_QUIZ',
            payload: id
          });
        }
        if (!data.success) {
          dispatch({
            type: 'QUIZ_ERROR',
            payload: data.massage
          });
          console.log(data.message, 'delete quiz unsuccessfull...');
        }
      })
      .catch(err => {
        dispatch({
          type: 'QUIZ_ERROR',
          payload: 'something went wrong. sorry for the trouble.'
        });
        console.log(err, 'delete quiz catch err...');
      });
  }
}


export function createQuizSet(url, token, data, history) {
  return dispatch => {
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch({
            type: 'CREATE_QUIZSET',
            payload: data.quizSet
          });
        }
        if (!data.success) {
          dispatch({
            type: 'QUIZSET_ERROR',
            payload: data.massage
          });
          console.log(data.message, 'delete quiz unsuccessfull...');
        }
      })
      .catch(err => {
        dispatch({
          type: 'QUIZSET_ERROR',
          payload: 'something went wrong. sorry for the trouble.'
        });
        console.log(err, 'delete quiz catch err...');
      });
  }
}