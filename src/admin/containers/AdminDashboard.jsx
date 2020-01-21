import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../../app/containers/Home';
// import Login from './user/containers/Login';
// import Register from './user/containers/Register';
import ListQuiz from '../../quiz/containers/ListQuiz';
import CreateQuiz from './CreateQuiz';
import EditQuiz from './EditQuiz';

// import Header from './app/containers/Header';
// import Footer from './app/containers/Footer';

export default class AdminDashboard extends Component {
  render() {
    return (
      <div>
        <p>admin dashboard...</p>
        <Switch>
          <Route exact path='/' component={Home} />{' '}
          <Route exact path='/users/list-quiz' component={ListQuiz} />{' '}
          <Route exact path='/users/list-quiz' component={CreateQuiz} />{' '}
          <Route exact path='/users/list-quiz' component={EditQuiz} />{' '}
        </Switch>{' '}
        {/* <Footer /> */}
      </div>
    );
  }
}
