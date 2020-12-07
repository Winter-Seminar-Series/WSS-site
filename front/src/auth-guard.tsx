import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import {
  redirectWhenUserIsNotLoggedIn
} from './redux/actions/account'

function PrivateRoute({ isLoggedIn, redirectWhenUserIsNotLoggedIn, ...rest }) {
  isLoggedIn = localStorage.getItem('WSS') && true;
  useEffect(() => {
    setTimeout(() => {
      if (!isLoggedIn) {
        redirectWhenUserIsNotLoggedIn();
      }
    }, 500)
  }, [redirectWhenUserIsNotLoggedIn])
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
