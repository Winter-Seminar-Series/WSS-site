import { useEffect, useState } from 'react';

export default function useTimer() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const utcDate = new Date();
    const tzDate = new Date(
      utcDate.toLocaleString('en-US', { timeZone: 'Asia/Tehran' }),
    );
    const offset = utcDate.getTime() - tzDate.getTime();

    const startDate = new Date(2025, 4, 10, 8);
    startDate.setTime(startDate.getTime() + offset); // force the timezone to Tehran time

    const interval = setInterval(() => {
      const diff = Math.max(0, startDate.getTime() - Date.now());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
}
