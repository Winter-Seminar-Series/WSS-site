import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';
import Header from './views/Home/header';
import Footer from './views/Home/footer';
import './styles/style.scss';
import Home from './views/Home';
import About from './views/About';
import SeminarList from './views/SeminarList';
import WorkshopList from './views/WorkshopList';
import VideoGallery from './views/VideoGallery';
import ImageGallery from './views/ImageGallery';
import StaffList from './views/StaffList';
import Schedule from './views/Schedule';
import Register from './views/Register';
import Details from './views/Details';

function App() {
  return (
    <>
      <Header></Header>
      <Router>
        <Switch>
          <Route path="/details" component={Details} />
          <Route path="/register" component={Register} />
          <Route path="/schedule" component={Schedule} />
          <Route path="/staff-list" component={StaffList} />
          <Route path="/image-gallery" component={ImageGallery} />
          <Route path="/video-gallery" component={VideoGallery} />
          <Route path="/workshop-list" component={WorkshopList} />
          <Route path="/seminar-list" component={SeminarList} />
          <Route path="/about" component={About} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
      <Footer></Footer>
    </>
  );
}

export default App;
