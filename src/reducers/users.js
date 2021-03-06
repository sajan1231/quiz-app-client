const initialState = {
  isLoading: false,
  user: null,
  currentScore: 0,
  error: ''
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user
      };

    case 'REGISTER':
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user
      };

    case 'UPDATE_USER':
      return {
        ...state,
        isLoading: false,
        user: action.payload.user
      };

    case 'UPDATE_USER_SCORE':
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          scores: [...state.user.scores, action.payload]
        }
      };

    case 'DELETE_USER_SCORE':
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          scores: state.user.scores
            .filter(score => score._id !== action.payload)
            .reverse()
        }
      };

    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isLoading: false,
        user: null,
        token: null,
        error: ''
      };

    case 'UPDATE_CURRENT_SCORE':
      return {
        ...state,
        isLoading: false,
        currentScore: action.payload || 0
      };

    case 'AUTH_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case 'AUTH_IN_PROCESS':
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
}
