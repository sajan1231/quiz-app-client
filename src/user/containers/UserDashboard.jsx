import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../../app/containers/Home';
// import Login from './user/containers/Login';
// import Register from './user/containers/Register';
import ListQuiz from '../../quiz/containers/ListQuiz';
// import Header from './app/containers/Header';
// import Footer from './app/containers/Footer';
import PlayQuiz from '../../quiz/components/PlayQuiz';

export default class UserDashboard extends Component {
  render() {
    return (
      <div style={{ margin: '20px 0' }}>
        <PlayQuiz />
        <Switch>
          <Route exact path='/' component={Home} />{' '}
          <Route exact path='/users/list-quiz' component={ListQuiz} />{' '}
        </Switch>{' '}
      </div>
    );
  }
}
