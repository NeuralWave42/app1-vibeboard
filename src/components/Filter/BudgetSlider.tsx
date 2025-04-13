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
      {/* Label and value display */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div>
          <span className="font-medium">From</span>
          <span className="ml-1">£{range.min}</span>
        </div>
        <div>
          <span className="font-medium">To</span>
          <span className="ml-1">£{range.max === MAX_BUDGET ? `${MAX_BUDGET}+` : range.max}</span>
        </div>
      </div>

      {/* Slider container with padding for handle overflow */}
      <div className="px-2 py-4">
        <div className="relative">
          {/* Track background */}
          <div className="absolute h-1 bg-gray-200 rounded-full w-full" />
          
          {/* Selected range track */}
          <div
            className="absolute h-1 bg-blue-600 rounded-full"
            style={{
              left: `${(range.min / MAX_BUDGET) * 100}%`,
              width: `${((range.max - range.min) / MAX_BUDGET) * 100}%`
            }}
          />

          {/* Range inputs */}
          <input
            type="range"
            min="0"
            max={MAX_BUDGET}
            step={STEP}
            value={range.min}
            onChange={handleMinChange}
            className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 
              [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:shadow-md 
              [&::-webkit-slider-thumb]:hover:border-blue-700"
          />
          <input
            type="range"
            min="0"
            max={MAX_BUDGET}
            step={STEP}
            value={range.max}
            onChange={handleMaxChange}
            className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 
              [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:shadow-md 
              [&::-webkit-slider-thumb]:hover:border-blue-700"
          />
        </div>
      </div>

      {/* Apply button */}
      <button
        onClick={onApply}
        className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
          transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Apply Range
      </button>
    </div>
  );
};
