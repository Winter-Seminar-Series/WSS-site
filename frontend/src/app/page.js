import Header from './Header';
import Programs from './Programs';
import Seminar from './seminar/Seminar';
import Staff from './staff/Staff';
import Footer from './Footer';
import Form from './forms/Form';

export default function Home() {
  return (
    <div>
      {/*<Header />*/}
      {/*<Programs />*/}
      {/*<Seminar />*/}
      {/*<Staff />*/}
      {/*<Footer />*/}
      <Form formType={'signUp'} overline={'Overline goes here'} title={'Sign Up'} fields={[
        { title: 'Email', hint: 'Enter your email', type: 'email' },
        { title: 'Password', hint: 'Enter your password', type: 'password' },
        { title: 'Confirm Password', hint: 'Confirm your password', type: 'password' },
      ]} />
    </div>
  );
}
