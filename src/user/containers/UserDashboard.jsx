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
          {/* <Route path='/list-quiz' component={ListQuiz} /> */}
        </Switch>
        <p>user dashboard....</p>
      </div>
    );
  }
}

export default UserDashboard;
