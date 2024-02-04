import { fetchWorkshops } from '../../../lib/api/events/workshop';
import { isAuthenticated } from '../../../lib/auth';
import Footer from '../../../ui/components/Footer';
import Navbar, { NavbarPlaceholder } from '../../../ui/components/Navbar';
import Workshop from './Workshop';

export default async function WorkshopPage({ params: { id } }) {
  const authenticated = await isAuthenticated();
  const workshops = await fetchWorkshops();
  const workshop = workshops.find((workshop) => workshop.id === parseInt(id));
  return (
    <>
      <Navbar isAuthenticated={authenticated} />
      <NavbarPlaceholder />
      <Workshop workshop={workshop} />
      <Footer />
    </>
  );
}
