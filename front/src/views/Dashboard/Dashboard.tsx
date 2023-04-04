import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
// import '../../../node_modules/bootstrap/scss/bootstrap.scss';
import Profile from './Profile';
import Registration from './Registration';
import ViewStream from './ViewStream';
import Streams from './Streams';
import Sidebar from './Sidebar';
import UserSeminarList from './UserSeminarList';
import UserWorkshopList from './UserWorkshopList';
import { verifyPayment } from '../../redux/actions/account';
import { connect } from 'react-redux';

function Dashboard({ match, verifyPayment, thisSeries }) {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const authority = urlParams.get('Authority');
  const status = urlParams.get('Status');
  if (authority && status) {
    verifyPayment(authority, status, thisSeries);
  }

  return (
    <>
      <Sidebar></Sidebar>
      <div className="dashboard-container">
        <Switch>
          <Route
            path={match.url + '/seminar-registration'}
            component={Registration}
          />
          {/* <Route
            path={match.url + '/seminar-list'}
            component={UserSeminarList}
          />
          <Route
            path={match.url + '/workshop-list'}
            component={UserWorkshopList}
          /> */}
          <Route path={match.url + '/profile'} component={Profile} />
          <Route path={match.url + "/stream/:id"} component={ViewStream} />
          <Route path={match.url + '/stream'} component={Streams} />
          <Redirect to={match.url + '/seminar-registration'} />
        </Switch>
      </div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => ({
  thisSeries: state.account.thisSeries,
});

export default connect(mapStateToProps, {
  verifyPayment,
})(Dashboard);
