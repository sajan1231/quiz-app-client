import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import ListQuiz from '../../quiz/containers/ListQuiz';
import CreateQuiz from '../../quiz/components/CreateQuiz';
import EditQuiz from '../../quiz/components/EditQuiz';
import PlayQuiz from '../../quiz/components/PlayQuiz';

class AdminDashboard extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={PlayQuiz} />
          <Route path='/quiz/list-quiz' component={ListQuiz} />
          <Route path='/quiz/create-quiz' component={CreateQuiz} />
          <Route path='/quiz/:id/edit' component={EditQuiz} />
          <Route path='/*' component={ErrorPage} />
        </Switch>
      </div>
    );
  }
}

export default AdminDashboard;

export const ErrorPage = () => {
  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <img src='../../assets/media/' alt='404 error page' />
      <h2>404 Page Not Found</h2>
    </div>
  );
};
