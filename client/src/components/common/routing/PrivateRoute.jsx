import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component, ...rest }) => {
  const user = useSelector((state) => state.user);
  const condRender = (props) => (
    user
      ? <Component {...props} />
      : <Redirect to='/login' />
    )
  return (
    <Route {...rest} render={condRender} />
  )
}

export default PrivateRoute;
