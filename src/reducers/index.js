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
import quizsetReducer from './quizset'

const rootReducer = combineReducers({
  user: usersReducer,
  questions: questionReducer,
  quizsets: quizsetReducer,
});

export const store = createStore(rootReducer, applyMiddleware(Thunk));