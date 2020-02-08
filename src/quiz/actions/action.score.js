import { action, handleCatchError, removeError } from '../../utils/helper';

export function createScore(url, token, score, history) {
  return dispatch => {
    dispatch(action('AUTH_IN_PROCESS', true));

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(score)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, 'score created...');

        if (data.success) {
          dispatch(action('UPDATE_USER_SCORE', data.score));
          history.push('/');
        } else if (!data.success) {
          dispatch(action('AUTH_ERROR', data.massage));
        }
      })
      .catch(err => {
        console.log(err, 'create score catch err...');

        handleCatchError(dispatch, action, 'AUTH_ERROR');
        removeError(dispatch, action, 'AUTH_ERROR');
      });
  };
}
