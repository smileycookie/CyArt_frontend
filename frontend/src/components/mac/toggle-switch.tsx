'use client';
import React from 'react';

interface ToggleSwitchProps {
  label: string;
  description?: string;
  enabled: boolean;
  onToggle: () => void;
}

export function ToggleSwitch({ label, description, enabled, onToggle }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div>
        <p className="font-medium">{label}</p>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={enabled}
          onChange={onToggle}
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 relative transition-all duration-300">
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 transform peer-checked:translate-x-5" />
        </div>
        <span className="ml-2 text-sm">{enabled ? "ON" : "OFF"}</span>
      </label>
    </div>
  );
}
