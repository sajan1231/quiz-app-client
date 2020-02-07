import {
  action
} from '../../utils/helper';

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
        dispatch(action('AUTH_ERROR', 'something went wrong. sorry for the trouble.'));
        console.log(err, 'delete score catch error...');
      });
  }
}