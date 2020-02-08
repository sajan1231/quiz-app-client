import { action, handleCatchError, removeError } from '../../utils/helper';

export default function handleDeleteScore(url, token, id) {
  return dispatch => {
    dispatch(action('AUTH_IN_PROCESS', true));

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
          dispatch(action('DELETE_USER_SCORE', id));
          console.log('delete score success...');
        } else if (!data.success) {
          dispatch(action('AUTH_ERROR', data.message));
          console.log('delete score error...');
        }
      })
      .catch(err => {
        console.log(err, 'delete score catch error...');

        handleCatchError(dispatch, action, 'AUTH_ERROR');
        removeError(dispatch, action, 'AUTH_ERROR');
      });
  };
}
