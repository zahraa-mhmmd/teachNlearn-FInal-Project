import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../globalState/index';

const PrivateTeacherRoute = ({ component: Comp, ...props }) => {
  const { user } = useContext(AuthContext);
  return user.isTeacher ? (
    <Comp {...props} />
  ) : (
    <Navigate to="/404" replace={true} noThrow={true} />
  );
};


export default PrivateTeacherRoute;
