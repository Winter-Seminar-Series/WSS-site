'use server';

import Header from '../ui/components/Header';
import Programs from '../ui/components/Programs';
import Seminar from '../ui/landing/seminar/Seminar';
import Staff from '../ui/landing/staff/Staff';
import Footer from '../ui/components/Footer';
import Timer from '../ui/components/Timer';
import { isAuthenticated } from '../lib/auth';
import Advisors from '../ui/landing/advisors/Advisors';

export default async function Home() {
  const authenticated = await isAuthenticated();
  return (
    <>
      <Header isAuthenticated={authenticated} />
      <Programs />
      <Advisors />
      <Seminar />
      <Staff />
      <Timer />
      <Footer />
    </>
  );
}
