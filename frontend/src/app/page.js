import Footer from './Footer';
import Header from './Header';
import Programs from './Programs';
import Seminar from './seminars/Seminar';
import Staff from './Staff';

export default function Home() {
  return (
    <>
      <Header />
      <Programs />
      <Seminar />
      <Staff />
      <Footer />
    </>
  );
}
