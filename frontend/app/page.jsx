import Header from '../ui/Header';
import Programs from '../ui/Programs';
import Seminar from './seminar/Seminar';
import Staff from './staff/Staff';
import Footer from '../ui/Footer';
import Timer from '../ui/Timer';

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
