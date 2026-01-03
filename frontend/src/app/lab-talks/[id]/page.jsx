import { isAuthenticated } from '../../../lib/auth';
import Footer from '../../../ui/components/Footer';
import Navbar, { NavbarPlaceholder } from '../../../ui/components/Navbar';
import LabTalk from './LabTalks';
import { fetchLabTalks } from '../../../lib/api/events/labTalks';

export default async function WorkshopPage({ params }) {
  const { id } = await params;
  const authenticated = await isAuthenticated();
  const labTalks = await fetchLabTalks();
  const labTalk = labTalks.find((labTalk) => labTalk.id === parseInt(id));

  return (
    <>
      <Navbar isAuthenticated={authenticated} />
      <NavbarPlaceholder />
      <LabTalk labTalk={labTalk} />
      <Footer />
    </>
  );
}
