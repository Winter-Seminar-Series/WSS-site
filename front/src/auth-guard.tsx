import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

function PrivateRoute({ isLoggedIn, ...rest }) {
  return (
    <>
      {isLoggedIn ? (
        <Route {...rest} />
      ) : (
        <Route {...rest} />
        // <Route
        //   render={({ location }) => (
        //     <Redirect
        //       to={{
        //         pathname: '/dashboard/profile',
        //         state: { from: location },
        //       }}
        //     />
        //   )}
        // />
      )}
    </>
  );
}

const mapStateToProps = (state, ownProps) => ({
  isLoggedIn: state.account.isLoggedIn,
  ownProps,
});

export default connect(mapStateToProps, {})(PrivateRoute);
