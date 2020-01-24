const initialState = {
  isLoading: true,
  quiz: []
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_QUIZES':
      return {
        ...state,
        quiz: action.payload
      };

    case 'CREATE_QUIZ':
      return {
        ...state,
        quiz: [...state.quiz, action.payload]
      };
    case 'UPDATE_QUIZ':
      return {
        ...state,
        quiz: [...state.quiz, action.payload]
      };

    case 'DELETE_QUIZ':
      return {
        ...state,
        quiz: state.quiz.filter(question => question._id !== action.payload)
      };

    default:
      return state;
  }
}