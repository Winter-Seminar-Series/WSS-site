import React from 'react';
import { Route, Switch } from 'react-router-dom';
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

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/seminar/:id" component={SeminarDetail} />
        <Route path="/workshop/:id" component={WorkshopDetail} />
        <Route path="/about" component={About} />
        <Route path="/workshops" component={Workshops} />
        <Route path="/seminars" component={Seminars} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/staff" component={Staff} />
        {/* <Route path="/create-account" component={CreateAccount} /> */}
        <Route path="/login" component={Login} />
        <Route
          path="/password-reset/confirm/:token"
          render={() => <ResetPassword key={Math.random()} />}
        />
        <Route path="/password-reset" component={ForgotPassword} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
