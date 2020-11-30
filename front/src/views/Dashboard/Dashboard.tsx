import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Profile from './Profile';
import SeminarRegistration from './SeminarRegistration';
import Sidebar from './Sidebar';
import UserSeminarList from './UserSeminarList';
import UserWorkshopList from './UserWorkshopList';
import WorkshopRegistration from './WorkshopRegistration';
import '../../../node_modules/bootstrap/scss/bootstrap.scss';

function Dashboard({ match }) {
  return (
    <>
      <Sidebar></Sidebar>
      <div className="dashboard-container">
        <Switch>
          <Route
            path={match.url + '/seminar-registration'}
            component={SeminarRegistration}
          />
          <Route
            path={match.url + '/workshop-registration'}
            component={WorkshopRegistration}
          />
          <Route
            path={match.url + '/seminar-list'}
            component={UserSeminarList}
          />
          <Route
            path={match.url + '/workshop-list'}
            component={UserWorkshopList}
          />
          <Route path={match.url + '/profile'} component={Profile} />
          <Route
            path={match.url + '/'}
            exact
            component={() => {
              return <></>;
            }}
          />
        </Switch>
      </div>
    </>
  );
}

export default Dashboard;
