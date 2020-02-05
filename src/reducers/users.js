const initialState = {
  authInProcess: false,
  isLoading: true,
  user: null,
  currentScore: 0,
  error: ''
}

export default function usersReducer(state = initialState, action) {

  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoading: false,
          token: action.payload.token,
          user: action.payload.user,
          authInProcess: false,
      };

    case 'REGISTER':
      return {
        ...state,
        isLoading: false,
          token: action.payload.token,
          user: action.payload.user,
          authInProcess: false,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        isLoading: false,
          user: action.payload.user,
          authInProcess: false,
      };

    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isLoading: true,
          user: null,
          token: null,
          error: ""
      };

    case 'UPDATE_CURRENT_SCORE':
      return {
        ...state,
        isLoading: false,
          currentScore: action.payload || 0,
          authInProcess: false,
      };

    case 'AUTH_ERROR':
      return {
        ...state,
        error: action.payload,
          authInProcess: false,
      };
    case 'AUTH_IN_PROCESS':
      return {
        ...state,
        authInProcess: action.payload
      };

    default:
      return state;
  }
}