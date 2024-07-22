'use client';

import { StreamEventLicense } from '../../../lib/types';

export default function VideoEntry({
  streamLicense,
}: {
  streamLicense: StreamEventLicense;
}) {
  const { title, licenseKey } = streamLicense;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(licenseKey);
  };

  return (
    <div className="space-y-3">
      <div className="text-2xl font-bold">{title}</div>
      <div className="flex items-center gap-2 rounded-md border border-[rgba(238,238,241,1)] py-2 pl-5 pr-2.5 max-md:flex-col max-md:items-stretch max-md:p-3">
        <div className="grow select-all overflow-hidden text-ellipsis">
          {licenseKey}
        </div>
        <div className="flex shrink-0 items-center gap-x-2">
          <a
            className="h-10 w-full whitespace-nowrap rounded bg-primary-900 px-4 text-base font-semibold text-primary-100"
            href="https://app.spotplayer.ir/player/help/"
            target="_blank"
          >
            How to Use
          </a>
          <button
            className="flex h-10 w-full items-center justify-center gap-1 whitespace-nowrap rounded bg-secondary pl-4 pr-5 text-base font-semibold text-white"
            onClick={copyToClipboard}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.332 8.76663H8.88536C7.6987 8.76663 6.73203 7.80663 6.73203 6.61329V5.16663C6.73203 4.89329 6.51203 4.66663 6.23203 4.66663H4.1187C2.5787 4.66663 1.33203 5.66663 1.33203 7.45329V11.88C1.33203 13.6666 2.5787 14.6666 4.1187 14.6666H8.04536C9.58536 14.6666 10.832 13.6666 10.832 11.88V9.26663C10.832 8.98663 10.6054 8.76663 10.332 8.76663Z"
                fill="white"
              />
              <path
                d="M11.8785 1.33337H10.5652H9.83854H7.95187C6.44521 1.33337 5.22521 2.29337 5.17188 4.00671C5.21187 4.00671 5.24521 4.00004 5.28521 4.00004H7.17187H7.89854H9.21187C10.7519 4.00004 11.9985 5.00004 11.9985 6.78671V8.10004V9.90671V11.22C11.9985 11.26 11.9919 11.2934 11.9919 11.3267C13.4785 11.28 14.6652 10.2934 14.6652 8.55337V7.24004V5.43337V4.12004C14.6652 2.33337 13.4185 1.33337 11.8785 1.33337Z"
                fill="white"
              />
              <path
                d="M7.98578 4.76662C7.77911 4.55996 7.42578 4.69996 7.42578 4.98662V6.73329C7.42578 7.46662 8.04578 8.06662 8.80578 8.06662C9.27911 8.07329 9.93911 8.07329 10.5058 8.07329C10.7924 8.07329 10.9391 7.73996 10.7391 7.53996C10.0124 6.81329 8.71911 5.51329 7.98578 4.76662Z"
                fill="white"
              />
            </svg>
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
}
