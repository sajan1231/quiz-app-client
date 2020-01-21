const initialState = {
  isLoading: true,
  user: null
}

export default function usersReducer(state = initialState, action) {
  console.log(action, 'inside user reducer...');

  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoading: false,
          token: action.payload.token,
          user: action.payload.user,
      };

    case 'REGISTER':
      return {
        ...state,
        isLoading: false,
          token: action.payload.token,
          user: action.payload.user,
      };

    case 'LOGOUT':
      return {
        ...state,
        isLoading: true,
          user: null,
          token: null,
      };

    default:
      return state;
  }
}