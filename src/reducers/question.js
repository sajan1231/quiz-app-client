const initialState = {
  isLoading: false,
  questions: [],
  error: ""
};

export default function questionReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_QUESTIONS':
      return {
        ...state,
        isLoading: false,
          questions: action.payload,
      };

    case 'CREATE_QUESTION':
      return {
        ...state,
        isLoading: false,
          questions: [...state.questions, action.payload],
      };
    case 'UPDATE_QUESTION':
      return {
        ...state,
        isLoading: false,
          questions: [...state.questions, action.payload],
      };

    case 'DELETE_QUESTION':
      return {
        ...state,
        isLoading: false,
          questions: state.questions.filter(question => question._id !== action.payload),
      };

    case 'QUESTION_ERROR':
      return {
        ...state,
        isLoading: false,
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