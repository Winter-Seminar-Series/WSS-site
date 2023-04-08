import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './auth-guard';
import Header from './views/Layout/header';
import ChatBot from './views/ChatBot';
import Footer from './views/Layout/footer';
import './styles/style.scss';

const About = React.lazy(() => import('./views/About'));
const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const SeminarDetail = React.lazy(() => import('./views/Details/SeminarDetail'));
const RoundTableDetail = React.lazy(
  () => import('./views/Details/RoundTableDetail')
);
const LabTalkDetail = React.lazy(() => import('./views/Details/LabTalkDetail'));
const WorkshopDetail = React.lazy(
  () => import('./views/Details/WorkshopDetail')
);
const Home = React.lazy(() => import('./views/Home'));
const Login = React.lazy(() => import('./views/Login'));
const CreateAccount = React.lazy(() => import('./views/CreateAccount'));
const Seminars = React.lazy(() => import('./views/Seminars'));
const LabTalks = React.lazy(() => import('./views/LabTalks'));
const RoundTables = React.lazy(() => import('./views/RoundTables'));
const Staff = React.lazy(() => import('./views/Staff'));
const Workshops = React.lazy(() => import('./views/Workshops'));
const Schedule = React.lazy(() => import('./views/Schedule'));
const ForgotPassword = React.lazy(() => import('./views/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./views/ResetPassword'));
const DivarSponsor = React.lazy(() => import('./views/DivarSponsor'));
const FlightioSponsor = React.lazy(() => import('./views/FlightioSponsor'));
const PartSponsor = React.lazy(() => import('./views/PartSponsor'));

function App() {
  return (
    <>
      <Header />
      <React.Suspense fallback={<div>Loading...</div>}>
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
          <Route path="/sponsor/divar" component={DivarSponsor} />
          <Route path="/sponsor/flightio" component={FlightioSponsor} />
          <Route path="/sponsor/part" component={PartSponsor} />

          <Route path="/" component={Home} />
        </Switch>
      </React.Suspense>
      <Footer />
      <ChatBot />
    </>
  );
}

export default App;
