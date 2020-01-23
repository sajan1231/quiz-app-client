const initialState = {
  isLoading: true,
  quiz: []
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_QUIZES':
      return {
        ...state,
        ...action.payload
      };

    case 'CREATE_QUIZ':
      return {
        ...state,
        ...action.payload
      };
    case 'UPDATE_QUIZ':
      return {
        ...state,
        ...action.payload
      };

    case 'DELETE_QUIZ':
      console.log(action.payload, 'delete quiz payload...');
      const quiz = state.quiz.filter(question => {
        return !question._id === action.payload;
      });

      console.log(quiz, 'filterd quiz....');

      return {
        ...state,
        quiz
      };

    default:
      return state;
  }
}