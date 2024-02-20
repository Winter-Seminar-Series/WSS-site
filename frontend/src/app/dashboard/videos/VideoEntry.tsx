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
      <div className="flex items-center gap-y-2 rounded-md border border-[rgba(238,238,241,1)] py-2 pl-5 pr-2.5 max-md:flex-col max-md:items-stretch max-md:p-3">
        <div className="grow select-all">{licenseKey}</div>
        <div className="flex shrink-0 items-center gap-x-2">
          <button className="h-10 w-full whitespace-nowrap rounded bg-primary-900 px-4 text-base font-semibold text-primary-100">
            How to Use
          </button>
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
                d="M7.48543 4.86031V2.18763C7.48543 1.90345 7.7121 1.66663 7.99876 1.66663C8.25543 1.66663 8.47288 1.86562 8.50734 2.11768L8.5121 2.18763V4.86031L11.6987 4.86051C13.2854 4.86051 14.5889 6.15981 14.6621 7.78023L14.6654 7.92402V11.2836C14.6654 12.9153 13.4071 14.2548 11.8441 14.33L11.7054 14.3333H4.29203C2.70536 14.3333 1.40809 13.0405 1.33526 11.4141L1.33203 11.2698V7.91713C1.33203 6.28536 2.58397 4.93944 4.14669 4.86386L4.28536 4.86051L7.48543 4.86031L7.48536 9.12877L6.4187 8.02728C6.2187 7.82076 5.89203 7.82076 5.69203 8.02728C5.59203 8.13055 5.54536 8.26823 5.54536 8.40592C5.54536 8.51056 5.57523 8.61961 5.63838 8.71191L5.69203 8.77767L7.63203 10.7879C7.72536 10.8911 7.8587 10.9462 7.9987 10.9462C8.10981 10.9462 8.22092 10.908 8.30888 10.8355L8.3587 10.7879L10.2987 8.77767C10.4987 8.57114 10.4987 8.23381 10.2987 8.02728C10.1169 7.83953 9.83038 7.82246 9.62953 7.97608L9.57203 8.02728L8.51203 9.12877L8.5121 4.86031H7.48543Z"
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
