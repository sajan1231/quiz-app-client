const initialState = {
  isLoading: true,
  quiz: []
};

export default function quizReducer(state = initialState, action) {
  console.log(action, action.payload, 'inside quiz reducer...............');

  switch (action.type) {
    case 'GET_QUIZES':
      return {
        ...state,
        quiz: action.payload
      };

    case 'CREATE_QUIZ':
      console.log(state, 'UPDATE_QUIZ...............');

      return {
        ...state,
        quiz: [...state.quiz, action.payload]
      };
    case 'UPDATE_QUIZ':
      console.log(state, 'UPDATE_QUIZ...............');

      return {
        ...state,
        quiz: [...state.quiz, action.payload]
      };

    case 'DELETE_QUIZ':
      console.log(state, 'DELETE_QUIZ...............');

      return {
        ...state,
        quiz: state.quiz.filter(question => question._id !== action.payload)
      };

    default:
      return state;
  }
}