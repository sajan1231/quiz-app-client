const initialState = {
  isLoading: true,
  quiz: [],
  error: ""
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_QUIZSETS':
      return {
        ...state,
        isLoading: false,
          quiz: action.payload,
          category: ['all', ...new Set(action.payload.map(quiz => quiz.category))]
      };

    case 'CREATE_QUIZSET':
      return {
        ...state,
        isLoading: false,
          quiz: [...state.quiz, action.payload],
          category: ['all', ...new Set([...state.quiz, action.payload].map(quiz => quiz.category))]
      };
    case 'UPDATE_QUIZSET':
      return {
        ...state,
        isLoading: false,
          quiz: [...state.quiz, action.payload],
          category: ['all', ...new Set([...state.quiz, action.payload].map(quiz => quiz.category))]
      };

    case 'DELETE_QUIZSET':
      return {
        ...state,
        isLoading: false,
          quiz: state.quiz.filter(question => question._id !== action.payload),
          category: ['all', ...new Set(state.quiz.filter(question => question._id !== action.payload).map(quiz => quiz.category))]
      };

    case 'QUIZSET_ERROR':
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}