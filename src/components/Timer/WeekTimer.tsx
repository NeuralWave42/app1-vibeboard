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
    <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 
      text-white py-4 px-6 rounded-xl shadow-lg animate-gradient-shift border border-white/20">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      <h2 className="relative text-lg font-bold text-center mb-3 tracking-wide">
        Time Left for Spontaneous Fun!
      </h2>
      <div className="relative grid grid-cols-4 gap-3 text-center">
        <TimeUnit value={timeLeft.days} label="days" />
        <TimeUnit value={timeLeft.hours} label="hours" />
        <TimeUnit value={timeLeft.mins} label="mins" />
        <TimeUnit value={timeLeft.secs} label="secs" />
      </div>
    </div>
  );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 hover:bg-white/20 transition-colors">
    <div className="text-3xl font-bold tabular-nums animate-pulse">
      {value.toString().padStart(2, '0')}
    </div>
    <div className="text-xs font-medium uppercase tracking-wider opacity-90">{label}</div>
  </div>
);
