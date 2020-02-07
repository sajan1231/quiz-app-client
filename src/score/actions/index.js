export default function handleDeleteScore(url, token) {
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
            type: 'UPDATE_USER',
            payload: data
          });
        } else if (!data.success) {
          dispatch({
            type: 'AUTH_ERROR',
            payload: data.message
          });
        }
      })
      .catch(err => {
        dispatch({
          type: 'AUTH_ERROR',
          payload: 'something went wrong. sorry for the trouble.'
        });
        console.log(err, 'delete score catch error...');
      });
  }
}