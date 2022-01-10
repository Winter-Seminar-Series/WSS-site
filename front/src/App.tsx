import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './auth-guard';
import './styles/style.scss';
import About from './views/About';
import Dashboard from './views/Dashboard/Dashboard';
import SeminarDetail from './views/Details/SeminarDetail';
import WorkshopDetail from './views/Details/WorkshopDetail';
import Home from './views/Home';
import Footer from './views/Layout/footer';
import Header from './views/Layout/header';
import Login from './views/Login';
import CreateAccount from './views/CreateAccount';
import Seminars from './views/Seminars';
import Staff from './views/Staff';
import Workshops from './views/Workshops';
import Schedule from './views/Schedule';
import ForgotPassword from './views/ForgotPassword';
import ResetPassword from './views/ResetPassword';
import { useSelector } from 'react-redux';

function App() {
  const thisSeries = useSelector((state: any) => state.account.thisSeries);
  useEffect(() => {
    document.title = thisSeries + ' WSS';
  }, []);
  return (
    <>
      <Header />
      <Switch>
        <Route path={`/${thisSeries}/seminar/:id`} component={SeminarDetail} />
        <Route
          path={`/${thisSeries}/workshop/:id`}
          component={WorkshopDetail}
        />
        <Route path={`/${thisSeries}/about`} component={About} />
        <Route path={`/${thisSeries}/workshops`} component={Workshops} />
        <Route path={`/${thisSeries}/seminars`} component={Seminars} />
        <Route path={`/${thisSeries}/schedule`} component={Schedule} />
        <Route path={`/${thisSeries}/staff`} component={Staff} />
        {/* <Route path={`/${thisSeries}/create-account`} component={CreateAccount} /> */}
        <Route path={`/${thisSeries}/login`} component={Login} />
        <Route
          path={`/${thisSeries}/password-reset/confirm/:token`}
          render={() => <ResetPassword key={Math.random()} />}
        />
        <Route
          path={`/${thisSeries}/password-reset`}
          component={ForgotPassword}
        />
        <PrivateRoute path={`/${thisSeries}/dashboard`} component={Dashboard} />
        <Route path={`/${thisSeries}`} component={Home} />
        <Route exact path="/">
          <Redirect to={`/${thisSeries}`} />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
