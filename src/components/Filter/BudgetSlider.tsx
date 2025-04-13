import React, { useState, useEffect } from 'react';

interface BudgetSliderProps {
  minValue: number;
  maxValue: number;
  onChange: (values: { min: number; max: number }) => void;
  onApply: () => void;
}

export const BudgetSlider = ({ minValue, maxValue, onChange, onApply }: BudgetSliderProps) => {
  const [range, setRange] = useState({ min: minValue, max: maxValue });
  
  // Maximum allowed value for the slider
  const MAX_BUDGET = 1000;
  const STEP = 50;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), range.max);
    setRange(prev => ({ ...prev, min: newMin }));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), range.min);
    setRange(prev => ({ ...prev, max: newMax }));
  };

  useEffect(() => {
    onChange(range);
  }, [range, onChange]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm font-medium">
        <div className="flex flex-col items-center">
          <span className="text-purple-700">From</span>
          <span className="text-lg font-bold text-purple-900">£{range.min}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-purple-700">To</span>
          <span className="text-lg font-bold text-purple-900">
            £{range.max === MAX_BUDGET ? `${MAX_BUDGET}+` : range.max}
          </span>
        </div>
      </div>

      <div className="relative px-2 py-4">
        <div className="absolute h-2 bg-gradient-to-r from-purple-200 via-fuchsia-200 to-pink-200 
          rounded-full w-full shadow-inner" />
        
        <div
          className="absolute h-2 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 
            rounded-full shadow-sm"
          style={{
            left: `${(range.min / MAX_BUDGET) * 100}%`,
            width: `${((range.max - range.min) / MAX_BUDGET) * 100}%`
          }}
        />

        {/* Range inputs with updated thumb styling */}
        <input
          type="range"
          min="0"
          max={MAX_BUDGET}
          step={STEP}
          value={range.min}
          onChange={handleMinChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none 
            [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white 
            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-purple-500 
            [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:scale-110 
            [&::-webkit-slider-thumb]:transition-transform"
        />
        <input
          type="range"
          min="0"
          max={MAX_BUDGET}
          step={STEP}
          value={range.max}
          onChange={handleMaxChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none 
            [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white 
            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-purple-500 
            [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:scale-110 
            [&::-webkit-slider-thumb]:transition-transform"
        />
      </div>

      <button
        onClick={onApply}
        className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 
          text-white font-bold rounded-xl shadow-md hover:shadow-xl
          hover:scale-[1.02] focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
          disabled:opacity-50 disabled:hover:scale-100
          transition-all duration-300 ease-out"
      >
        Set Budget Range ✨
      </button>
    </div>
  );
};
