'use client';
import React from 'react';

interface ScheduleScanSelectorProps {
  frequency: string;
  time: string;
  period: string;
  onFrequencyChange: (val: string) => void;
  onTimeChange: (val: string) => void;
  onPeriodChange: (val: string) => void;
}

export function ScheduleScanSelector({
  frequency,
  time,
  period,
  onFrequencyChange,
  onTimeChange,
  onPeriodChange
}: ScheduleScanSelectorProps) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <p className="font-medium">Scheduled Scan</p>
      <div className="flex gap-2 mt-2">
        <select
          value={frequency}
          onChange={(e) => onFrequencyChange(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
        <input
          type="time"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        />
        <select
          value={period}
          onChange={(e) => onPeriodChange(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option>AM</option>
          <option>PM</option>
        </select>
      </div>
    </div>
  );
}
