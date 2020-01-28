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

    case 'UPDATE_CURRENT_SCORE':
      return {
        ...state,
        isLoading: false,
          currentScore: action.payload || 0
      }

      default:
        return state;
  }
}