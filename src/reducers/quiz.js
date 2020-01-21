const initialState = {
  isLoading: true,
  user: null
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_QUIZ':
      return state;

    case 'CREATE_QUIZ':
      return state;

    case 'EDIT_QUIZ':
      return state;

    default:
      return state;
  }
}