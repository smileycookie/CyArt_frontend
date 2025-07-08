// frontend\src\components\feature04\layer-pie-chart.tsx
'use client';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Smartphone, Cpu, Wifi, Battery, Settings, Touchpad, RefreshCw, HardDrive } from 'lucide-react';

const OUTER_DATA = [
  { name: 'Active Usage', value: 40, icon: <Smartphone size={12} />, color: '#1E3A8A' },
  { name: 'Background', value: 30, icon: <Cpu size={12} />, color: '#3B82F6' },
  { name: 'Network', value: 20, icon: <Wifi size={12} />, color: '#93C5FD' },
  { name: 'Power', value: 10, icon: <Battery size={12} />, color: '#BFDBFE' }
];

const INNER_DATA = [
  { name: 'UI Interactions', value: 25, icon: <Touchpad size={12} />, color: '#1E40AF' },
  { name: 'Background Sync', value: 15, icon: <RefreshCw size={12} />, color: '#2563EB' },
  { name: 'Data Transfer', value: 10, icon: <HardDrive size={12} />, color: '#60A5FA' },
  { name: 'Battery Usage', value: 5, icon: <Battery size={12} />, color: '#3B82F6' },
  { name: 'System', value: 5, icon: <Settings size={12} />, color: '#1E3A8A' }
];

const CustomTooltip = ({ active, payload }: { active?: boolean, payload?: any[] }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-md shadow-sm border border-gray-200 text-xs">
        <p className="font-medium">{payload[0].name}: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function LayerPieChart() {
  const [activeIndex, setActiveIndex] = React.useState<{outer: number|null, inner: number|null}>({outer: null, inner: null});

  return (
    <div className="w-full h-full flex">
      {/* Pie Chart - Left Side */}
      <div className="w-[55%] h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={OUTER_DATA}
              cx="50%"
              cy="50%"
              outerRadius={75}
              innerRadius={50}
              paddingAngle={1}
              dataKey="value"
              stroke="none"
              onMouseEnter={(_, index) => setActiveIndex({...activeIndex, outer: index})}
              onMouseLeave={() => setActiveIndex({...activeIndex, outer: null})}
            >
              {OUTER_DATA.map((entry, index) => (
                <Cell 
                  key={`outer-${index}`}
                  fill={activeIndex.outer === index ? '#1E40AF' : entry.color}
                />
              ))}
            </Pie>
            <Pie
              data={INNER_DATA}
              cx="50%"
              cy="50%"
              outerRadius={40}
              innerRadius={15}
              paddingAngle={1}
              dataKey="value"
              stroke="none"
              onMouseEnter={(_, index) => setActiveIndex({...activeIndex, inner: index})}
              onMouseLeave={() => setActiveIndex({...activeIndex, inner: null})}
            >
              {INNER_DATA.map((entry, index) => (
                <Cell 
                  key={`inner-${index}`}
                  fill={activeIndex.inner === index ? '#2563EB' : entry.color}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Labels - Right Side */}
      <div className="w-[45%] pl-2 flex flex-col justify-center">
        <div className="mb-1">
          <p className="text-[11px] font-semibold text-gray-500 mb-0.5">Primary</p>
          {OUTER_DATA.map((item, index) => (
            <div 
              key={`outer-${item.name}`}
              className="flex items-center py-[1px] hover:bg-blue-50 rounded"
              onMouseEnter={() => setActiveIndex({...activeIndex, outer: index})}
              onMouseLeave={() => setActiveIndex({...activeIndex, outer: null})}
            >
              <div 
                className="w-2 h-2 rounded-full mr-1.5 flex-shrink-0"
                style={{ 
                  backgroundColor: activeIndex.outer === index ? '#1E40AF' : item.color,
                }}
              />
              <span className="text-[11px] flex-1 truncate">{item.name}</span>
              <span className="text-[11px] text-gray-500 mr-2">{item.value}%</span> {/* Increased mr-1 to mr-2 */}
              {React.cloneElement(item.icon, {
                className: "w-3 h-3 flex-shrink-0",
                color: activeIndex.outer === index ? '#1E40AF' : item.color
              })}
            </div>
          ))}
        </div>

        <div>
          <p className="text-[11px] font-semibold text-gray-500 mb-0.5">Sub-features</p>
          {INNER_DATA.map((item, index) => (
            <div 
              key={`inner-${item.name}`}
              className="flex items-center py-[1px] hover:bg-blue-50 rounded"
              onMouseEnter={() => setActiveIndex({...activeIndex, inner: index})}
              onMouseLeave={() => setActiveIndex({...activeIndex, inner: null})}
            >
              <div 
                className="w-2 h-2 rounded-full mr-1.5 flex-shrink-0"
                style={{ 
                  backgroundColor: activeIndex.inner === index ? '#2563EB' : item.color,
                }}
              />
              <span className="text-[11px] flex-1 truncate">{item.name}</span>
              <span className="text-[11px] text-gray-500 mr-2">{item.value}%</span> {/* Increased mr-1 to mr-2 */}
              {React.cloneElement(item.icon, {
                className: "w-3 h-3 flex-shrink-0",
                color: activeIndex.inner === index ? '#2563EB' : item.color
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}