import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { AuthContext } from '../Context/authContext';


const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log(user, !!user)

  if ( !user || Object.keys(user).length === 0 ) {
    return children
  }

  return <Navigate to="/editor" />
};

export default PrivateRoute;
