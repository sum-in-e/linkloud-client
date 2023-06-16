'use client';

import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const Timer = ({ expireTimestamp }: { expireTimestamp: string }) => {
  const calculateTimeLeft = () => {
    const now = dayjs();
    const expiryTime = dayjs(expireTimestamp);
    const diffInSeconds = expiryTime.diff(now, 'second');

    if (diffInSeconds <= 0) return { expired: true };

    const minutes = Math.floor(diffInSeconds / 60);
    const seconds = diffInSeconds % 60;

    return { minutes, seconds, expired: false };
  };

  const [timeLeft, setTimeLeft] = useState<any>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
  }, [expireTimestamp]);

  useEffect(() => {
    if (timeLeft?.expired) return;

    const timerId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  if (timeLeft === null) return null;

  const time = `${String(timeLeft.minutes).padStart(2, '0')} : ${String(
    timeLeft.seconds
  ).padStart(2, '0')}`;

  return (
    <p className="absolute right-2 top-1/2 -translate-x-2 -translate-y-1/2 transform text-xs text-red-500">
      {timeLeft.expired ? '00:00' : time}
    </p>
  );
};

export default Timer;
