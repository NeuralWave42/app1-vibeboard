import React, { useEffect, useState } from 'react';
import { useWeekTimerStore } from '../../stores/weekTimerStore';

interface TimeRemaining {
  days: number;
  hours: number;
  mins: number;
  secs: number;
}

export const WeekTimer = () => {
  const { weekStartTime, checkWeek } = useWeekTimerStore();
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({ 
    days: 0, hours: 0, mins: 0, secs: 0 
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const endTime = weekStartTime + (7 * 24 * 60 * 60 * 1000);
      const diff = Math.max(0, endTime - now);

      // Ensure we never show negative values
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, mins, secs });

      // Check if we need to update the week
      if (diff <= 0) {
        checkWeek();
      }
    };

    // Calculate immediately and then every second
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [weekStartTime, checkWeek]);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg shadow-md">
      <h2 className="text-sm font-medium text-center mb-2">Time left this week</h2>
      <div className="grid grid-cols-4 gap-2 text-center">
        <TimeUnit value={timeLeft.days} label="days" />
        <TimeUnit value={timeLeft.hours} label="hours" />
        <TimeUnit value={timeLeft.mins} label="mins" />
        <TimeUnit value={timeLeft.secs} label="secs" />
      </div>
    </div>
  );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div>
    <div className="text-2xl font-bold tabular-nums">
      {value.toString().padStart(2, '0')}
    </div>
    <div className="text-xs opacity-75">{label}</div>
  </div>
);
