import { withRouter } from 'react-router-dom';
import React, { useEffect } from 'react';
import getCurrentUser from "./utils";

const ProtectedRoute = (WrappedComponent) => {
  const ProtectedRouteWrapper = (props) => {
    useEffect(() => {
      // check for the presence of an authentication token
      const token = getCurrentUser();  // replace this with your own token check
      if (!token) {
        // the user is not authenticated, redirect to the login page
        props.history.push('/login');
      }
    }, []);

    // the user is authenticated, render the protected route
    return <WrappedComponent {...props} />;
  };

  return withRouter(ProtectedRouteWrapper);
};

export default ProtectedRoute;
