// app/individual04/linechart/page.tsx
import PerformanceGauge from "@/components/feature04/performance-gauge";

export default function GaugeMeterPage() {
  return (
    <div className="absolute top-0 right-0 w-1/3 h-1/2 flex items-start justify-end p-4">
      <PerformanceGauge /> 
    </div>
  );
}