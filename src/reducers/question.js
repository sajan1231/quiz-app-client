const initialState = {
  isLoading: false,
  quiz: [],
  error: ""
};

export default function questionReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_QUIZZES':
      return {
        ...state,
        isLoading: false,
          questions: action.payload,
          // category: ['all', ...new Set(action.payload.map(quiz => quiz.category))]
      };

    case 'CREATE_QUIZ':
      return {
        ...state,
        isLoading: false,
          questions: [...state.questions, action.payload],
          // category: ['all', ...new Set([...state.questions, action.payload].map(quiz => quiz.category))]
      };
    case 'UPDATE_QUIZ':
      return {
        ...state,
        isLoading: false,
          questions: [...state.questions, action.payload],
          // category: ['all', ...new Set([...state.questions, action.payload].map(quiz => quiz.category))]
      };

    case 'DELETE_QUIZ':
      return {
        ...state,
        isLoading: false,
          questions: state.questions.filter(question => question._id !== action.payload),
          // category: ['all', ...new Set(state.quiz.filter(question => question._id !== action.payload).map(quiz => quiz.category))]
      };

    case 'QUIZ_ERROR':
      return {
        ...state,
        error: action.payload
      };

    case 'QUESTION_IN_PROCESS':
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
}