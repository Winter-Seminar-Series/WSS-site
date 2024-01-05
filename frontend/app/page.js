import Header from './Header';
import Programs from './Programs';
import Seminar from './seminar/Seminar';
import Staff from './staff/Staff';
import Footer from './Footer';
import Timer from './Timer';

export default function Home() {
  return (
    <>
      <Header />
      <Programs />
      <Seminar />
      <Staff />
      <Timer />
      <Footer />
    </>
  );
}
