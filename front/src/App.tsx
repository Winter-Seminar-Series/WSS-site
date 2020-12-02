import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './auth-guard';
import './styles/style.scss';
import About from './views/About';
import CardHolder from './views/CardHolder';
import Dashboard from './views/Dashboard/Dashboard';
import Details from './views/Details';
import Home from './views/Home';
import Footer from './views/Layout/footer';
import Header from './views/Layout/header';
import Login from './views/Login';
import Schedule from './views/Schedule';
import Signup from './views/Signup';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/cardholder" component={CardHolder} />
        <Route path="/details" component={Details} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/about" component={About} />
        <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
