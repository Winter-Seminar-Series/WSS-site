import { fetchSeminars } from '../../../lib/api/events/seminar';
import { isAuthenticated } from '../../../lib/auth';
import Footer from '../../../ui/components/Footer';
import Navbar, { NavbarPlaceholder } from '../../../ui/components/Navbar';
import Sponsor from './Sponsor';

export default async function SponsorPage({ params: { name } }) {
  const authenticated = await isAuthenticated();
  const seminars = await fetchSeminars();
  const seminar = seminars.find((seminar) => seminar.id === parseInt(name));

  return (
    <>
      <Navbar isAuthenticated={authenticated} />
      <NavbarPlaceholder />
      <Sponsor seminar={seminar} />
      <Footer />
    </>
  );
}
