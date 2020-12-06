import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './auth-guard';
import './styles/style.scss';
import About from './views/About';
import CardHolder from './views/CardHolder';
import Dashboard from './views/Dashboard/Dashboard';
import SeminarDetail from './views/SeminarDetail'
import Home from './views/Home';
import Footer from './views/Layout/footer';
import Header from './views/Layout/header';
import Login from './views/Login';
import Registration from './views/Registration';
import Speakers from './views/Speakers';
import StaffList from './views/StaffList';
import Workshops from './views/Workshops';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/seminar/:id" component={SeminarDetail} />
        <Route path="/workshop/:id" component={SeminarDetail} />
        <Route path="/postersession/:id" component={SeminarDetail} />
        <Route path="/workshops" component={Workshops} />
        <Route path="/cardholder" component={CardHolder} />
        <Route path="/about" component={About} />
        <Route path="/speakers" component={Speakers} />
        <Route path="/staff" component={StaffList} />
        <Route path="/signup" component={Registration} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
