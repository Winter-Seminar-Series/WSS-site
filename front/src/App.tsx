import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './auth-guard';
import './styles/style.scss';
import About from './views/About';
import Dashboard from './views/Dashboard/Dashboard';
import SeminarDetail from './views/Details/SeminarDetail'
import PostersessionDetail from './views/Details/PostersessionDetail'
import WorkshopDetail from './views/Details/WorkshopDetail'
import Home from './views/Home';
import Footer from './views/Layout/footer';
import Header from './views/Layout/header';
import Login from './views/Login';
import Register from './views/Register';
import Seminars from './views/Seminars';
import Staffs from './views/Staffs';
import Postersessions from './views/Postersessions';
import Workshops from './views/Workshops';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/seminar/:id" component={SeminarDetail} />
        <Route path="/workshop/:id" component={WorkshopDetail} />
        <Route path="/postersession/:id" component={PostersessionDetail} />
        <Route path="/workshops" component={Workshops} />
        <Route path="/about" component={About} />
        <Route path="/seminars" component={Seminars} />
        <Route path="/staffs" component={Staffs} />
        <Route path="/postersessions/" component={Postersessions} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
