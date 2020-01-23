import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../../app/containers/Home';

// import Login from './user/containers/Login';
// import Register from './user/containers/Register';
import ListQuiz from '../../quiz/containers/ListQuiz';
import CreateQuiz from '../../quiz/components/CreateQuiz';
import EditQuiz from '../../quiz/components/EditQuiz';
import QuizCard from '../../quiz/components/QuizCard';
import PlayQuiz from '../../quiz/components/PlayQuiz';
import QuizForm from '../../quiz/components/QuizForm';

import Header from '../../app/componets/Header';

class AdminDashboard extends Component {
  render() {
    const { user } = this.props;

    console.log(user, 'admin dash props user....');

    return (
      <div style={{ margin: '20px 0' }}>
        {/* <QuizCard /> */}
        {/* <ListQuiz /> */}
        {/* <EditQuiz /> */}
        {/* <CreateQuiz /> */}
        {/* <QuizForm /> */}
        {/* <PlayQuiz /> */}
        {user ? <Header user={user} handleLogout={this.handleLogout} /> : ''}
        <Switch>
          <Route exact path='/' component={PlayQuiz} />
          <Route path='/quiz/list-quiz' component={ListQuiz} />
          <Route path='/quiz/create-quiz' component={CreateQuiz} />
          <Route path='/quiz/:id/edit' component={EditQuiz} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state, 'admindash map state...');
  return state.user;
}

export default connect(mapStateToProps)(AdminDashboard);
