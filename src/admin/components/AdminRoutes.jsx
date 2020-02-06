import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import ListQuiz from '../../quiz/containers/ListQuiz';
import CreateQuestion from '../../quiz/components/CreateQuestion';
import CreateQuizset from '../../quiz/components/CreateQuizset';

import EditQuiz from '../../quiz/components/EditQuiz';
import PlayQuiz from '../../quiz/components/PlayQuiz';
import ErrorPage from '../../app/componets/ErrorPage';
import Score from '../../score/components/Score';
import ListQuizsets from '../../quiz/components/ListQuizsets';
import EditQuizset from '../../quiz/components/EditQuizset';

export default class AdminRoutes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={ListQuizsets} />
          <Route exact path='/quizsets/:id/play-quiz' component={PlayQuiz} />
          <Route exact path='/quizsets/:id/update' component={EditQuizset} />
          <Route path='/quizzes/create-quizset' component={CreateQuizset} />

          <Route path='/quizzes/list-quizzes' component={ListQuiz} />
          <Route path='/quizzes/create-quiz' component={CreateQuestion} />
          <Route path='/quizzes/:id/edit' component={EditQuiz} />

          <Route path='/users/score' component={Score} />
          <Route path='/*' component={ErrorPage} />
        </Switch>
      </div>
    );
  }
}
