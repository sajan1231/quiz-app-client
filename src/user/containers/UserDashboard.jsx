import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import PlayQuiz from '../../quiz/components/PlayQuiz';
import ErrorPage from '../../app/componets/ErrorPage';

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
