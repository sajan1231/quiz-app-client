const initialState = {
  isLoading: true,
  user: null
}

export default function usersReducer(state = initialState, action) {
  console.log(action, 'user reducer...');

  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoading: false,
          token: action.payload.token,
          user: action.payload.user,
          currentScore: action.payload.currentScore || 0
      };

    case 'REGISTER':
      return {
        ...state,
        isLoading: false,
          token: action.payload.token,
          user: action.payload.user,
          currentScore: action.payload.currentScore || 0
      };

    case 'UPDATE_USER':
      return {
        ...state,
        isLoading: false,
          user: action.payload.user,
          currentScore: action.payload.currentScore || 0
      };

    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isLoading: true,
          user: null,
          token: null
      };

    default:
      return state;
  }
}