import Header from '../ui/components/Header';
import Programs from '../ui/components/Programs';
import Seminar from './seminar/Seminar';
import Staff from './staff/Staff';
import Footer from '../ui/components/Footer';
import Timer from '../ui/components/Timer';
import { isAuthenticated } from '../lib/auth';

export default async function Home() {
  const authenticated = await isAuthenticated();

  return (
    <>
      <Header isAuthenticated={authenticated} />
      <Programs />
      <Seminar />
      <Staff />
      <Timer />
      <Footer />
    </>
  );
}
