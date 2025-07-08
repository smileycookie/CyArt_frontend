'use client';
import React from 'react';

interface ReportingIntervalSelectorProps {
  value: string;
  onChange: (val: string) => void;
}

export function ReportingIntervalSelector({ value, onChange }: ReportingIntervalSelectorProps) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <p className="font-medium">Reporting Interval</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 border rounded px-2 py-1 text-sm"
      >
        <option>Real-time</option>
        <option>Every 5 minutes</option>
        <option>1 hour</option>
        <option>24 hours</option>
      </select>
    </div>
  );
}
