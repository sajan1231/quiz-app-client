const initialState = {
  isLoading: false,
  quizsets: [],
  error: ''
};

export default function quizSetReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_QUIZSETS':
      return {
        ...state,
        isLoading: false,
        error: '',
        quizsets: action.payload
      };

    case 'CREATE_QUIZSET':
      return {
        ...state,
        isLoading: false,
        error: '',
        quizsets: [...state.quizsets, action.payload]
      };

    case 'UPDATE_QIZSET':
      return {
        ...state,
        isLoading: false,
        error: '',
        quizsets: state.quizsets.map(quizset => {
          if (quizset._id === action.payload._id) {
            return action.payload;
          } else {
            return quizset;
          }
        })
      };

    case 'DELETE_QUIZSET':
      return {
        ...state,
        isLoading: false,
        error: '',
        quizsets: state.quizsets.filter(
          quizset => quizset._id !== action.payload
        )
      };

    case 'QUIZSET_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case 'QUIZSET_IN_PROCESS':
      return {
        ...state,
        error: '',
        isLoading: action.payload
      };

    default:
      return state;
  }
}
