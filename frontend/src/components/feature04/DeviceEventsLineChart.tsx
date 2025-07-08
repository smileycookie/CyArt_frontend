// frontend\src\components\feature04\DeviceEventsLineChart.tsx
"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface DeviceEventsLineChartProps {
  isStandalone?: boolean;
}

export function DeviceEventsLineChart({ isStandalone = false }: DeviceEventsLineChartProps) {
  const deviceName = "Desktop";
  const timeRange = "January 1, 2025 - 00:00 to 24:00";
  
  const sampleData = [
    { timestamp: "2025-01-01T00:00:00", count: 40 },
    { timestamp: "2025-01-01T03:00:00", count: 30 },
    { timestamp: "2025-01-01T06:00:00", count: 80 },
    { timestamp: "2025-01-01T09:00:00", count: 120 },
    { timestamp: "2025-01-01T12:00:00", count: 195 },
    { timestamp: "2025-01-01T15:00:00", count: 210 },
    { timestamp: "2025-01-01T18:00:00", count: 175 },
    { timestamp: "2025-01-01T21:00:00", count: 90 },
  ];

  const extendedData = [
  ...Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    const existing = sampleData.find(item => new Date(item.timestamp).getHours() === i);
    return existing || { 
      timestamp: `2025-01-01T${hour}:00:00`, 
      count: null 
    };
  }),
  { 
    timestamp: `2025-01-02T00:00:00`, // This becomes 24:00
    count: sampleData[sampleData.length - 1]?.count || null 
  }
];

  const maxCount = Math.max(...sampleData.map(item => item.count ?? 0));
  const yInterval = Math.ceil(maxCount / 5 / 10) * 10;
  const yAxisMax = Math.ceil(maxCount / yInterval) * yInterval + yInterval;

  const formatXAxisTick = (timestamp: string) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const is24Hour = hours === 0 && date.getDate() === 2; // Handle 24:00 case
  return is24Hour ? '24:00' : (hours % 3 === 0 ? `${hours.toString().padStart(2, '0')}:00` : '');
};
  const formatTooltipTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const is24Hour = hours === 0 && date.getDate() === 2;
    return `Time: ${is24Hour ? '24:00' : `${hours}:00`}`;
  };

  return (
    <Card className={`${isStandalone ? 'absolute top-4 right-4 w-[560px] h-[340px]' : 'w-full h-full'} border border-gray-200 bg-white`}>
      <CardHeader className="pb-1">
        <CardTitle className="text-sm font-medium">Device Events - {deviceName}</CardTitle>
        <CardDescription className="text-xs text-gray-600">{timeRange}</CardDescription>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-50px)]">
        <ResponsiveContainer width="100%" height="100%" minHeight={220} maxHeight={240}>
          <LineChart
            data={extendedData}
            margin={{ top: 15, right: 15, left: 50, bottom: 35 }} // Adjusted left margin
            height={380} 
          >
            <CartesianGrid 
              stroke="hsl(0, 0%, 90%)" 
              strokeDasharray="3 3" 
              horizontal={true} 
              vertical={false}
            />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatXAxisTick}
              tick={{ fontSize: 10, fill: "hsl(0, 0%, 40%)" }}
              axisLine={{ stroke: "hsl(0, 0%, 70%)" }}
              tickLine={{ stroke: "hsl(0, 0%, 70%)" }}
              tickMargin={10}
              interval={0} // Important - shows all ticks but we filter in formatter
              height={45}
            />
            <YAxis
                domain={[0, 300]}
                tickCount={6}
                tick={{ fontSize: 10, fill: "hsl(0, 0%, 40%)" }} // Reduced font size slightly
                ticks={[0, 60, 120, 180, 240, 300]}
                interval={0}
                axisLine={{ stroke: "hsl(0, 0%, 70%)" }}
                tickLine={{ stroke: "hsl(0, 0%, 70%)" }}
                tickMargin={16} // Reduced from 12
                width={48} // Reduced from 45
              />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 98%)',
                borderColor: 'hsl(0, 0%, 80%)',
                color: 'hsl(0, 0%, 20%)',
                borderRadius: '6px',
                fontSize: '12px',
                padding: '6px 10px',
              }}
              formatter={(value: number) => value !== null ? [`Count: ${value}`] : []}
              labelFormatter={formatTooltipTime}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="hsl(211, 100%, 50%)"
              strokeWidth={2}
              dot={{
                fill: 'hsl(0, 0%, 100%)',
                stroke: 'hsl(211, 100%, 50%)',
                strokeWidth: 2,
                r: 4
              }}
              activeDot={{
                r: 6,
                fill: 'hsl(0, 0%, 100%)',
                stroke: 'hsl(211, 100%, 50%)',
                strokeWidth: 3
              }}
              connectNulls={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}