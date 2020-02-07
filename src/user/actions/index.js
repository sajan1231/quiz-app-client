import {
  action
} from '../../utils/helper';

export function handleAutoLogin(url, jwt, history) {
  return dispatch => {
    dispatch(action('AUTH_IN_PROCESS', true));

    fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwt
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.success) {
          if (data.user) {
            dispatch(action('LOGIN', data));
          }
        } else if (!data.success) {
          dispatch(
            action('AUTH_ERROR', '')
          );
          history.push('/users/login');
        }
      })
      .catch(err => {
        dispatch(
          action('AUTH_ERROR', 'something went wrong. sorry for the trouble.')
        );
        console.log(err, 'auto login catch err...');
      });
  };
}

export function handleUserLogin(url, user, history) {
  return dispatch => {
    dispatch(action('AUTH_IN_PROCESS', true));

    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.success) {
          if (data.token) localStorage.setItem('jwt', data.token);
          dispatch(action('LOGIN', data));
          history.push('/');
        } else if (data && !data.success) {
          dispatch(action('AUTH_ERROR', data.message));
        }
      })
      .catch(err => {
        dispatch(
          action('AUTH_ERROR', 'something went wrong. sorry for the trouble.')
        );
        console.log(err, 'user login catch err...');
      });
  };
}

export function handleUserRegister(url, user, history) {
  return dispatch => {
    dispatch(action('AUTH_IN_PROCESS', true));

    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          if (data && data.user) {
            if (data.token) localStorage.setItem('jwt', data.token);
            dispatch(action('REGISTER', data));
            history.push('/');
          }
        } else if (!data.success) {
          dispatch(action('AUTH_ERROR', data.message));
        }
      })
      .catch(err => {
        dispatch(
          action('AUTH_ERROR', 'something went wrong. sorry for the trouble.')
        );
        console.log(err, 'user register catch err');
      });
  };
}