import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        console.log(props.user, 'PrivateRoute user...');
        return props.user && props.user.isAdmin === true ? (
          <Component {...props} />
        ) : (
          <Redirect to='/users/login' />
        );
      }}
    />
  );
}

const mapStateToProps = state => {
  console.log(state, 'private route map state....');
  return state.user;
};

export default connect(mapStateToProps)(PrivateRoute);
