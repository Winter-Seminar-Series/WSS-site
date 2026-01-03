import { fetchRoundTables } from '../../../lib/api/events/roundTable';
import { isAuthenticated } from '../../../lib/auth';
import Footer from '../../../ui/components/Footer';
import Navbar, { NavbarPlaceholder } from '../../../ui/components/Navbar';
import RoundTableDetail from './RoundTableDetail';

export default async function RoundTablePage({ params }) {
  const { id } = await params;
  const authenticated = await isAuthenticated();
  const roundTables = await fetchRoundTables();
  const roundTable = roundTables.find((seminar) => seminar.id === parseInt(id));

  return (
    <>
      <Navbar isAuthenticated={authenticated} />
      <NavbarPlaceholder />
      <RoundTableDetail roundTable={roundTable} />
      <Footer />
    </>
  );
}
