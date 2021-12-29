import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const PublicRoute = ({component, ...rest}: any) => {
  const { currentUser } = useAuth();

  const routeComponent = (props: any) => (
      currentUser
          ? <Redirect to={{pathname: '/app'}}/>
          : React.createElement(component, props)
  );

  return <Route {...rest} render={routeComponent}/>;
};

export default PublicRoute;
