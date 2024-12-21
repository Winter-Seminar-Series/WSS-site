import { useState, useRef, useEffect } from 'react';

export default function Dropdown({ transparent }) {
  const historyData = [
    { name: '9th WSS', url: 'https://wss-sharif.com' },
    { name: '8th WSS', url: 'https://8th.wss-sharif.com' },
    { name: '7th WSS', url: 'https://7th.wss-sharif.com' },
    { name: '6th WSS', url: 'https://6th.wss-sharif.com' },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center rounded-md px-6 text-base font-semibold max-lg:h-9 max-lg:px-4 lg:h-12 ${
          transparent
            ? 'bg-white text-secondary-500 hover:bg-whitesmoke'
            : 'bg-secondary-500 text-white hover:bg-secondary-400'
        }`}
        // className={`flex items-center rounded-md px-6 text-base font-semibold max-lg:h-9 max-lg:px-4 lg:h-12 ${
        //   transparent
        //     ? 'border bg-secondary-500 text-white hover:bg-secondary-400'
        //     : 'bg-white text-secondary-500 hover:bg-whitesmoke'
        // }`}
      >
        History
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06-.02L10 10.588l3.71-3.4a.75.75 0 111.02 1.102l-4 3.666a.75.75 0 01-1.02 0l-4-3.666a.75.75 0 01-.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className=" absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-2">
            {historyData.map((value) => {
              return (
                <a
                  key={value.url}
                  href={value.url}
                  target={'_blank'}
                  className="block p-2 px-4 text-sm text-gray-700  hover:bg-gray-100 hover:text-gray-900 "
                >
                  {value.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
