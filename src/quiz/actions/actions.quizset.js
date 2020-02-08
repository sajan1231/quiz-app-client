import { action, handleCatchError, removeError } from '../../utils/helper';

export function createQuizset(url, token, data, history) {
  return dispatch => {
    dispatch(action('QUIZSET_IN_PROCESS', true));

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
          dispatch(action('CREATE_QUIZSET', data.quizset));
          history.push('/');
        }
        if (!data.success) {
          dispatch(action('QUIZSET_ERROR', data.message));
        }
      })
      .catch(err => {
        console.log(err, 'create quizset catch err...');

        handleCatchError(dispatch, action, 'QUIZSET_ERROR');
        removeError(dispatch, action, 'QUIZSET_ERROR');
      });
  };
}

export function getQuizsets(url, token) {
  return dispatch => {
    dispatch(action('QUIZSET_IN_PROCESS', true));

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
          dispatch(action('GET_QUIZSETS', data.quizsets));
        }
        if (!data.success) {
          dispatch(action('QUIZSET_ERROR', data.message));
        }
      })
      .catch(err => {
        console.log(err, 'get quizset catch err...');

        handleCatchError(dispatch, action, 'QUIZSET_ERROR');
        removeError(dispatch, action, 'QUIZSET_ERROR');
      });
  };
}

export function updateQuizset(url, token, data, id, history) {
  return dispatch => {
    dispatch(action('QUIZSET_IN_PROCESS', true));

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({
        name: data
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(action('UPDATE_QIZSET', data.quizset));
          history.push('/');
        }
        if (!data.success) {
          dispatch(action('QUIZSET_ERROR', data.message));
        }
      })
      .catch(err => {
        console.log(err, 'update quizset catch err...');

        handleCatchError(dispatch, action, 'QUIZSET_ERROR');
        removeError(dispatch, action, 'QUIZSET_ERROR');
      });
  };
}

export function handleDeleteQuizset(url, token, id) {
  return dispatch => {
    dispatch(action('QUIZSET_IN_PROCESS', true));

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
          dispatch(action('DELETE_QUIZSET', id));
        }
        if (!data.success) {
          dispatch(action('QUIZSET_ERROR', data.message));
        }
      })
      .catch(err => {
        console.log(err, 'delete quizset catch err...');

        handleCatchError(dispatch, action, 'QUIZSET_ERROR');
        removeError(dispatch, action, 'QUIZSET_ERROR');
      });
  };
}
