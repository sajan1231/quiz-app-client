import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../../user/components/Login';
import Register from '../../user/components/Register';

export default function PublicRoutes() {
  return (
    <Switch>
      <Route exact path='/users/login' component={Login} />
      <Route path='/users/register' component={Register} />
    </Switch>
  );
}
