import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../../app/containers/Home';
// import Login from './user/containers/Login';
// import Register from './user/containers/Register';
import ListQuiz from '../../quiz/containers/ListQuiz';
// import Header from './app/containers/Header';
// import Footer from './app/containers/Footer';
import PlayQuiz from '../../quiz/components/PlayQuiz';
import Header from '../../app/componets/Header';

class UserDashboard extends Component {
  handleLogout = () => {
    console.log('handleLogout called...');
    localStorage.clear();
    window.location.reload();
  };

  render() {
    const { user } = this.props;

    return (
      <div style={{ margin: '20px 0' }}>
        {user ? <Header user={user} handleLogout={this.handleLogout} /> : ''}
        <Switch>
          <Route exact path='/' component={PlayQuiz} />{' '}
          <Route exact path='/users/list-quiz' component={ListQuiz} />{' '}
        </Switch>{' '}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state, 'userdash map state...');
  return state.user;
}

export default connect(mapStateToProps)(UserDashboard);
