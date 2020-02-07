import {
  action
} from '../../utils/helper';

export function handleCreateQuiz(url, token, data, history) {
  return dispatch => {
    dispatch(action('QUESTION_IN_PROCESS', true));

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
          dispatch(action('CREATE_QUESTION', data.question));
          history.push('/');
        } else if (!data.success) {
          dispatch(action('QUESTION_ERROR', data.massage));
        }
      })
      .catch(err => {
        dispatch(action('QUESTION_ERROR', 'something went wrong sorry for the trouble.'));
        console.log(err, 'create question catch err...');
      });
  }
}


export function handleUpdateQuestion(url, token, data, id, history) {
  return dispatch => {
    dispatch(action('QUESTION_IN_PROCESS', true));

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
          dispatch(action('UPDATE_QUESTION', data.question));
          history.push('/');
        } else if (!data.success) {
          dispatch(action('QUESTION_ERROR', data.massage));
        }
      })
      .catch(err => {
        dispatch(action('QUESTION_ERROR', 'something went wrong. sorry for the trouble.'));
        console.log(err, 'update question catch err...');
      });
  }
}

export function handleFetchQuestions(url, token) {
  return dispatch => {
    dispatch(action('QUESTION_IN_PROCESS', true));

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
          dispatch(action('GET_QUESTIONS', data.quizset.questions));
        } else if (!data.success) {
          dispatch(action('QUESTION_ERROR', data.massage));
        }
      })
      .catch(err => {
        dispatch(action('QUESTION_ERROR', 'something went wrong. sorry for the trouble.'));
        console.log(err, 'get questions catch err...');
      });
  }
}

export function handleUpdateScore(url, token, score, history) {
  return dispatch => {
    dispatch(action('QUESTION_IN_PROCESS', true));

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
          dispatch(action('UPDATE_USER', data));
          history.push('/');
        } else if (!data.success) {
          dispatch(action('QUESTION_ERROR', data.massage));
        }
      })
      .catch(err => {
        dispatch(action('QUESTION_ERROR', 'something went wrong. sorry for the trouble.'));
        console.log(err, 'update user score catch err...');
      });
  }
};

export function deleteQuestion(url, token, id, history) {
  return dispatch => {
    dispatch(action('QUESTION_IN_PROCESS', true));

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
          dispatch(action('DELETE_QUESTION', id));
        }
        if (!data.success) {
          dispatch(action('QUESTION_ERROR', data.massage));
        }
      })
      .catch(err => {
        dispatch(action('QUESTION_ERROR', 'something went wrong. sorry for the trouble.'));
        console.log(err, 'delete question catch err...');
      });
  }
}