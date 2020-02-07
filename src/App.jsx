import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from './app/componets/Header';
import AdminRoutes from './admin/components/AdminRoutes';
import UserRoutes from './user/components/UserRoutes';
import PublicRoutes from './app/componets/PublicRoutes';

import { handleAutoLogin } from './user/actions';

import { BASE_URL } from './static';

class App extends Component {
  componentDidMount() {
    const { jwt } = localStorage;
    if (jwt) {
      this.props.dispatch(
        handleAutoLogin(BASE_URL + '/users/me', jwt, this.props.history)
      );
    } else if (!jwt) {
      this.props.history.push('/users/login');
    }
  }

  handleLogout = () => {
    this.props.dispatch({ type: 'LOGOUT', payload: null });
    this.props.history.push('/users/login');
  };

  render() {
    const { user } = this.props;

    return (
      <div className='app' style={{ paddingTop: '60px' }}>
        <Header user={user} handleLogout={this.handleLogout} />
        {!user.user ? <PublicRoutes /> : ''}

        {user && user.user && user.user.isAdmin ? (
          <AdminRoutes />
        ) : user && user.user && !user.user.isAdmin ? (
          <UserRoutes />
        ) : (
          ''
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default withRouter(connect(mapStateToProps)(App));
