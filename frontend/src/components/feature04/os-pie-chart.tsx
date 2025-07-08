'use client';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Square, Apple, TerminalSquare, Smartphone, Tablet } from 'lucide-react';

const COLORS = ['#1E3A8A', '#3B82F6', '#93C5FD', '#60A5FA', '#BFDBFE'];
const HIGHLIGHT_COLORS = ['#1E40AF', '#2563EB', '#60A5FA', '#3B82F6', '#93C5FD'];

interface OsData {
  name: string;
  value: number;
  icon: React.ReactNode;
}

export default function OsPieChart() {
  const data: OsData[] = [
    { name: 'Windows', value: 45, icon: <Square size={16} className="text-[#1E3A8A]" /> },
    { name: 'macOS', value: 25, icon: <Apple size={16} className="text-[#3B82F6]" /> },
    { name: 'Linux', value: 15, icon: <TerminalSquare size={16} className="text-[#93C5FD]" /> },
    { name: 'iOS', value: 10, icon: <Smartphone size={16} className="text-[#60A5FA]" /> },
    { name: 'Android', value: 5, icon: <Tablet size={16} className="text-[#BFDBFE]" /> }
  ];

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  return (
    <div className="w-full h-full flex items-start"> {/* Matches StatusPieChart alignment */}
      <div className="flex w-full max-w-[340px]"> {/* Same max-width */}
        <div className="w-[150px] h-[150px] ml-1"> {/* Matching dimensions */}
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={activeIndex === index ? HIGHLIGHT_COLORS[index] : COLORS[index]}
                    stroke="#fff"
                    strokeWidth={1}
                    style={{
                      filter: activeIndex === index ? 'drop-shadow(0px 0px 6px rgba(30, 64, 175, 0.3))' : 'none',
                      transition: 'all 0.3s ease',
                      opacity: activeIndex === null || activeIndex === index ? 1 : 0.7
                    }}
                  />
                ))}
              </Pie>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 rounded-md shadow-sm border border-gray-200 text-sm">
                        <div className="font-medium">{payload[0].name}: {payload[0].value}%</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="pl-3 flex flex-col justify-center"> {/* Matching padding */}
          {data.map((item, index) => (
            <div 
              key={item.name}
              className="flex items-center mb-2 hover:bg-blue-50 p-1 rounded transition-colors" 
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ 
                  backgroundColor: activeIndex === index ? HIGHLIGHT_COLORS[index] : COLORS[index],
                  transition: 'background-color 0.3s ease'
                }}
              />
              <span className="text-xs font-medium text-gray-700"> {/* Smaller text */}
                {item.name}
              </span>
              <span className="text-xs font-bold text-gray-900 ml-1"> {/* Matches StatusPieChart */}
                {item.value}%
              </span>
              <span className="ml-1">
                {React.cloneElement(item.icon as React.ReactElement<{className?: string}>, { 
                  className: `flex-shrink-0 ${activeIndex === index ? 'opacity-100' : 'opacity-70'}`
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}