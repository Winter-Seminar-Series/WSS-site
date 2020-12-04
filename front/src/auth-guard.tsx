import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export function PrivateRoute({ ...rest }) {
  const auth = true;
  return (
    <>
      {auth ? (
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
