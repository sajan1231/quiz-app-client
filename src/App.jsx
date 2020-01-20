import React, { Component } from 'react';
import './assets/stylesheets/App.css';
import { Switch, Route } from 'react-router-dom';

import Home from './app/containers/Home';
import Login from './user/containers/Login';
import Register from './user/containers/Register';
import ListQuiz from './quiz/containers/ListQuiz';
import Header from './app/containers/Header';
import Footer from './app/containers/Footer';

export default class App extends Component {
  state = {};

  render() {
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />{' '}
          <Route exact path='/users/login' component={Login} />{' '}
          <Route exact path='/users/register' component={Register} />{' '}
          <Route exact path='/users/list-quiz' component={ListQuiz} />{' '}
        </Switch>{' '}
        {/* <Footer /> */}
      </div>
    );
  }
}
