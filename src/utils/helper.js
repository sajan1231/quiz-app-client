export default function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function action(type, payload) {
  return {
    type,
    payload
  };
}

export function removeError(dispatch, action, type) {
  setTimeout(() => {
    dispatch(action(type, ''));
  }, 3000);
}

export function handleCatchError(dispatch, action, type) {
  dispatch(
    action(type, 'Something went wrong. Please check your internet connection')
  );
}
