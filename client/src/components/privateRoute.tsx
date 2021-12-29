import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const PrivateRoute = ({component, ...rest}: any) => {
  const { currentUser } = useAuth();

  const routeComponent = (props: any) => (
      currentUser
          ? React.createElement(component, props)
          : <Redirect to={{pathname: '/login'}}/>
  );

  return <Route {...rest} render={routeComponent}/>;
};

export default PrivateRoute;
