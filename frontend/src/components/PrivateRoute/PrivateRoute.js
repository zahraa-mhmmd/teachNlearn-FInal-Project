import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../globalState/index';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return user ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/authentication" replace={true} />
  );
};

export default PrivateRoute;
