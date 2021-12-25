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
  const thisYear = useSelector((state: any) => state.account.thisYear);
  useEffect(() => {
    document.title = 'WSS' + thisYear;
  }, []);
  return (
    <>
      <Header />
      <Switch>
        <Route path={`/${thisYear}/seminar/:id`} component={SeminarDetail} />
        <Route path={`/${thisYear}/workshop/:id`} component={WorkshopDetail} />
        <Route path={`/${thisYear}/about`} component={About} />
        <Route path={`/${thisYear}/workshops`} component={Workshops} />
        <Route path={`/${thisYear}/seminars`} component={Seminars} />
        <Route path={`/${thisYear}/schedule`} component={Schedule} />
        <Route path={`/${thisYear}/staff`} component={Staff} />
        <Route path={`/${thisYear}/create-account`} component={CreateAccount} />
        <Route path={`/${thisYear}/login`} component={Login} />
        <Route
          path={`/${thisYear}/password-reset/confirm/:token`}
          render={() => <ResetPassword key={Math.random()} />}
        />
        <Route
          path={`/${thisYear}/password-reset`}
          component={ForgotPassword}
        />
        <PrivateRoute path={`/${thisYear}/dashboard`} component={Dashboard} />
        <Route path={`/${thisYear}/`} component={Home} />
        <Route exact path="/">
          <Redirect to={`/${thisYear}`} />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
