'use client';

import { CertificateInfo } from '../../../lib/types';

export default function CertificateEntry({
  certificateInfo,
}: {
  certificateInfo: CertificateInfo;
}) {
  const { plan, uuid } = certificateInfo;
  const certificateUrl = `${process.env.NEXT_PUBLIC_ORIGIN}/files/${uuid}`;

  const copyURL = () => {
    navigator.clipboard.writeText(certificateUrl);
  };

  const download = () => {
    window.open(certificateUrl, '_blank').focus();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 rounded-md border border-[rgba(238,238,241,1)] py-2 pl-5 pr-2.5 max-md:flex-col max-md:items-stretch max-md:p-3">
        <div className="grow select-all overflow-hidden text-ellipsis">
          {plan}
        </div>
        <div className="flex shrink-0 items-center gap-x-2">
          <button
            className="flex h-10 w-full items-center justify-center gap-1 whitespace-nowrap rounded bg-secondary pl-4 pr-5 text-base font-semibold text-white"
            onClick={copyURL}
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
            Copy URL
          </button>
          <button
            className="flex h-10 w-full items-center justify-center gap-1 whitespace-nowrap rounded bg-secondary pl-4 pr-5 text-base font-semibold text-white"
            onClick={download}
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
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
