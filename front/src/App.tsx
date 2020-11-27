import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './views/Layout/header';
import Footer from './views/Layout/footer';
import Home from './views/Home';
import About from './views/About';
import VideoGallery from './views/VideoGallery';
import ImageGallery from './views/ImageGallery';
import Schedule from './views/Schedule';
import Details from './views/Details';
import Signup from './views/Signup';
import Login from './views/Login';
import CardHolder from './views/CardHolder';

import './styles/style.scss';

function App() {
  return (
    <>
      <Header></Header>
      <Router>
        <Switch>
          <Route path="/cardholder" component={CardHolder} />
          <Route path="/details" component={Details} />
          <Route path="/schedule" component={Schedule} />
          <Route path="/image-gallery" component={ImageGallery} />
          <Route path="/video-gallery" component={VideoGallery} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/about" component={About} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
      <Footer></Footer>
    </>
  );
}

export default App;
