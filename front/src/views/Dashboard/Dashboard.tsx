import React from 'react';
import { Route } from 'react-router-dom';
import Favourites from './Favourites';
import Profile from './Profile';
import Sidebar from './Sidebar';

function Dashboard({ match }) {
  return (
    <>
      <Sidebar></Sidebar>
      <div className="dashboard-container">
        <Route path={match.url + '/favourites'} component={Favourites} />
        <Route path={match.url + '/profile'} component={Profile} />
      </div>
    </>
  );
}

export default Dashboard;
