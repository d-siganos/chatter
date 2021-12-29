import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import { PrivateRoute, PublicRoute, Dashboard, Home, Login, Signup, PasswordReset } from './components';
import { AuthProvider } from './contexts/authContext';

const App = () => (
  <Router>
    <AuthProvider>
      <Switch>
        <Route exact path='/' component={Home} />
        <PrivateRoute path='/app' component={Dashboard} />
        <PublicRoute path='/login' component={Login} />
        <PublicRoute path='/signup' component={Signup} />
        <PublicRoute path='/password-reset' component={PasswordReset} />
      </Switch>
    </AuthProvider>
  </Router>
);

export default App;
