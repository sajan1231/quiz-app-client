export function handleCreateQuiz(url, token, data) {
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
            payload: data.quiz
          });
        } else if (!data.success) {
          dispatch({
            type: 'ERROR',
            payload: data.massage
          });
          console.log('create quiz unsuccessfull...');
        }
      })
      .catch(err => {
        console.log(err, 'question post catch err...');
      });
  }
}


export function handleQuizUpdate(url, token, data) {
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
            payload: data.quiz
          });
        } else if (!data.success) {
          console.log('quiz update unsuccessfull...');
          dispatch({
            type: 'ERROR',
            payload: data.massage
          });
        }
      })
      .catch(err => {
        console.log(err, 'update quiz catch err...');
      });
  }
}

export function handleFetchQuizzes(url, token) {
  console.log('handleGetQuizzes action called...1');
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
          console.log(data, 'GET_QUIZZES...2');
          dispatch({
            type: 'GET_QUIZZES',
            payload: data.quizzes.reverse()
          });
        } else if (!data.success) {
          dispatch({
            type: 'ERROR',
            payload: data.massage
          });
          // this.setState({ err: data.message });
          console.log(data.message, 'error getting quizzes...');
        }
      })
      .catch(err => {
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
            type: 'ERROR',
            payload: data.massage
          });
          console.log(data, 'update score failed...');
        }
      })
      .catch(err => {
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
          history.push('/');
        }
        if (!data.success) {
          dispatch({
            type: 'ERROR',
            payload: data.massage
          });
          console.log(data.message, 'delete quiz unsuccessfull...');
        }
      })
      .catch(err => {
        console.log(err, 'delete quiz catch err...');
      });
  }
}