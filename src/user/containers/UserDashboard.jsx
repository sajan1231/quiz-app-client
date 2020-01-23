import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import ListQuiz from '../../quiz/containers/ListQuiz';
import PlayQuiz from '../../quiz/components/PlayQuiz';

class UserDashboard extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={PlayQuiz} />
          <Route path='/*' component={ErrorPage} />
        </Switch>
      </div>
    );
  }
}

export default UserDashboard;

export const ErrorPage = () => {
  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <img src='../../assets/media/' alt='404 error page' />
      <h2>404 Page Not Found</h2>
    </div>
  );
};
