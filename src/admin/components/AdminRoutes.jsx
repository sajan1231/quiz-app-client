import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import ListQuiz from '../../quiz/containers/ListQuiz';
import CreateQuiz from '../../quiz/components/CreateQuiz';
import EditQuiz from '../../quiz/components/EditQuiz';
import PlayQuiz from '../../quiz/components/PlayQuiz';
import ErrorPage from '../../app/componets/ErrorPage';
import Score from '../../score/components/Score';

export default class AdminRoutes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={PlayQuiz} />
          <Route path='/quizzes/list-quizzes' component={ListQuiz} />
          <Route path='/quizzes/create-quiz' component={CreateQuiz} />
          <Route path='/quizzes/:id/edit' component={EditQuiz} />
          <Route path='/users/score' component={Score} />
          <Route path='/*' component={ErrorPage} />
        </Switch>
      </div>
    );
  }
}
