const initialState = {
  isLoading: false,
  quiz: [],
  error: ""
};

export default function quizSetReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_QUIZSETS':
      return {
        ...state,
        isLoading: false,
          quizSet: action.payload,
      };

    case 'CREATE_QUIZSET':
      return {
        ...state,
        isLoading: false,
          quizSet: [...state.quizSet, action.payload],
      };

    case 'UPDATE_QUIZSET':
      return {
        ...state,
        isLoading: false,
          quizSet: [...state.quizSet, action.payload],
      };

    case 'DELETE_QUIZSET':
      return {
        ...state,
        isLoading: false,
          quizSet: state.quizSet.filter(question => question._id !== action.payload),
      };

    case 'QUIZSET_ERROR':
      return {
        ...state,
        error: action.payload
      };

    case 'QUIZSET_IN_PROCESS':
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
}