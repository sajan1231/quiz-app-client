import {
  createStore,
  applyMiddleware
} from 'redux';

import {
  combineReducers
} from 'redux';

import Thunk from 'redux-thunk';

import usersReducer from './users';
import questionReducer from './question';
import quizSetReducer from './quizSet'

const rootReducer = combineReducers({
  user: usersReducer,
  questions: questionReducer,
  quizSet: quizSetReducer,
});

export const store = createStore(rootReducer, applyMiddleware(Thunk));