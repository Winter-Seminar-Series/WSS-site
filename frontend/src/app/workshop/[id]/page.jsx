import { fetchWorkshops } from '../../../lib/api/events/workshop';
import Workshop from './Workshop';

export default async function WorkshopPage({ params: { id } }) {
  const workshops = await fetchWorkshops();
  const workshop = workshops.find((workshop) => workshop.id === id);
  return <Workshop />;
}
