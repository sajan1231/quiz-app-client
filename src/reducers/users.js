const initialState = {
  isLoading: true,
  user: null
}

export function usersReducer (state=initialState, action) {
  console.log(action, 'inside user reducer...');

  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
      }

    case 'AUTO_LOGIN':
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
      }

    case 'REGISTER':
      return state;


    case 'LOGOUT':
      return {
        ...state,
        isLoading: true,
        user: null,
        token: null,
      }
    
    case "":
      return state;
  
    default:
      return state;
  }
}