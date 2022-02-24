import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './auth-guard';
import './styles/style.scss';
import About from './views/About';
import Dashboard from './views/Dashboard/Dashboard';
import SeminarDetail from './views/Details/SeminarDetail';
import RoundTableDetail from "./views/Details/RoundTableDetail";
import LabTalkDetail from './views/Details/LabTalkDetail';
import WorkshopDetail from './views/Details/WorkshopDetail';
import Home from './views/Home';
import Footer from './views/Layout/footer';
import Header from './views/Layout/header';
import Login from './views/Login';
import CreateAccount from './views/CreateAccount';
import Seminars from './views/Seminars';
import LabTalks from './views/LabTalks';
import RoundTables from "./views/RoundTables";
import Staff from './views/Staff';
import Workshops from './views/Workshops';
import Schedule from './views/Schedule';
import ForgotPassword from './views/ForgotPassword';
import ResetPassword from './views/ResetPassword';
import Sponsor from './views/Sponsor';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/seminar/:id" component={SeminarDetail} />
        <Route path="/roundtable/:id" component={RoundTableDetail} />
        <Route path="/labtalk/:id" component={LabTalkDetail} />
        <Route path="/workshop/:id" component={WorkshopDetail} />
        <Route path="/about" component={About} />
        <Route path="/workshops" component={Workshops} />
        <Route path="/seminars" component={Seminars} />
        <Route path="/labtalks" component={LabTalks} />
        <Route path="/roundtables" component={RoundTables} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/staff" component={Staff} />
        <Route path="/create-account" component={CreateAccount} />
        <Route path="/login" component={Login} />
        <Route
          path="/password-reset/confirm/:token"
          render={() => <ResetPassword key={Math.random()} />}
        />
        <Route path="/password-reset" component={ForgotPassword} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="/sponsor" component={Sponsor} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
