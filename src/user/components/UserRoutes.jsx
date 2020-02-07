import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import PlayQuiz from '../../quiz/components/PlayQuiz';
import ErrorPage from '../../app/componets/ErrorPage';
import ListQuizsets from '../../quiz/components/ListQuizsets';
import Score from '../../score/components/Score';

export default class UserRoutes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={ListQuizsets} />
          <Route exact path='/quizzes/:id/play-quiz' component={PlayQuiz} />
          <Route path='/users/score' component={Score} />
          <Route path='/*' component={ErrorPage} />
        </Switch>
      </div>
    );
  }
}
