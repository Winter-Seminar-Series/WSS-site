import Header from '../ui/components/Header';
import Programs from '../ui/components/Programs';
import Seminar from './seminar/Seminar';
import Staff from './staff/Staff';
import Footer from '../ui/components/Footer';
import Timer from '../ui/components/Timer';

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
