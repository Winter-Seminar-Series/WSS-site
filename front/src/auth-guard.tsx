import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ ...rest }, { isLoggedIn }) {
  isLoggedIn = localStorage.getItem('WSS') && true;
  return (
    <>
      {isLoggedIn ? (
        <Route {...rest} />
      ) : (
        <Route
          render={({ location }) => (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )}
        />
      )}
    </>
  );
}

export default PrivateRoute;
