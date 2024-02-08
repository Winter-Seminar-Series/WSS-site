import { fetchSeminars } from '../../../lib/api/events/seminar';
import { isAuthenticated } from '../../../lib/auth';
import Footer from '../../../ui/components/Footer';
import Navbar, { NavbarPlaceholder } from '../../../ui/components/Navbar';
import Seminar from './Seminar';

export default async function WorkshopPage({ params: { id } }) {
  const authenticated = await isAuthenticated();
  const seminars = await fetchSeminars();
  const seminar = seminars.find((seminar) => seminar.id === parseInt(id));

  return (
    <>
      <Navbar isAuthenticated={authenticated} />
      <NavbarPlaceholder />
      <Seminar seminar={seminar} />
      <Footer />
    </>
  );
}
