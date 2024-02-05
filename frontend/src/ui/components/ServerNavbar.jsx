'use server';

import { isAuthenticated } from '../../lib/auth';
import Navbar from './Navbar';

export default async function ServerNavbar({ fixed = true }) {
  const authenticated = await isAuthenticated();

  return <Navbar isAuthenticated={authenticated} />;
}
