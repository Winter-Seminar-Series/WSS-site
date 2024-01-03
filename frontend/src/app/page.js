import Header from './Header';
import Programs from './Programs';
import Seminar from './seminar/Seminar';
import Staff from './staff/Staff';
import Footer from './Footer';
import Form from './forms/Form';
import SignUpForm from './forms/SignUpForm';
import LogInForm from './forms/LogInForm';
import PasswordResetForm from './forms/PasswordResetForm';

export default function Home() {
  return (
    <div>
      {/*<Header />*/}
      {/*<Programs />*/}
      {/*<Seminar />*/}
      {/*<Staff />*/}
      {/*<Footer />*/}
      <SignUpForm />
      <LogInForm />
      <PasswordResetForm />
    </div>
  );
}
