import { fetchStreamLicenses } from '../../../lib/api/dashboard/video';
import VideoEntry from './VideoEntry';

export default async function Videos() {
  const streamLicenses = await fetchStreamLicenses();

  return (
    <div className="space-y-7">
      {streamLicenses.map((streamLicense, index) => (
        <VideoEntry key={index} streamLicense={streamLicense} />
      ))}
    </div>
  );
}
