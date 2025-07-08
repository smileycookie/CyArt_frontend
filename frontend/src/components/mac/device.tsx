'use client';
import React, { JSX, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Play, AlertTriangle, Activity, Network, HardDrive, Cpu, Calendar, Clock, Info, Settings, BarChart3, FileText } from 'lucide-react';

import { ToggleSwitch } from '@/components/mac/toggle-switch';
import { ScheduleScanSelector } from '@/components/mac/schedule-scan-selector';
import { ReportingIntervalSelector } from '@/components/mac/report-interval-selector';

interface Log {
  id: number;
  timestamp: string;
  level: 'ERROR' | 'WARNING' | 'INFO';
  message: string;
  source: string;
}

const mockAgent = {
  id: "AGT-001",
  name: "DESKTOP-ABC123",
  ip: "192.168.1.100",
  mac: "00:1B:44:11:3A:B7",
  os: "Windows 11 Pro",
  osIcon: "windows",
  cvss: 7.5,
  status: "online",
  lastSeen: "2025-07-02 14:30:22",
  version: "Agent v2.1.4",
  domain: "CORPORATE",
  uptime: "7 days, 14 hours",
  cpu: "Intel Core i7-12700K",
  memory: "16 GB DDR4",
  storage: "512 GB SSD",
  location: "Building A, Floor 3"
};

const mockLogs: Log[] = [
  {
    id: 1,
    timestamp: "2025-07-02 14:25:15",
    level: "WARNING",
    message: "Suspicious network activity detected from IP 203.0.113.45",
    source: "Network Monitor"
  },
  {
    id: 2,
    timestamp: "2025-07-02 14:20:08",
    level: "INFO",
    message: "System scan completed successfully - 0 threats found",
    source: "Antivirus Engine"
  },
  {
    id: 3,
    timestamp: "2025-07-02 14:15:32",
    level: "ERROR",
    message: "Failed to update signature database - connection timeout",
    source: "Update Service"
  },
  {
    id: 4,
    timestamp: "2025-07-02 14:10:45",
    level: "INFO",
    message: "Agent heartbeat sent successfully",
    source: "Communication Service"
  },
  {
    id: 5,
    timestamp: "2025-07-02 14:05:12",
    level: "WARNING",
    message: "High CPU usage detected - 85% for process chrome.exe",
    source: "Performance Monitor"
  },
  {
    id: 6,
    timestamp: "2025-07-02 14:00:03",
    level: "INFO",
    message: "User login detected - administrator@corporate.local",
    source: "Authentication Service"
  }
];

const mockSettings = {
  autoUpdate: true,
  realTimeProtection: true,
  scheduledScan: "Daily at 2:00 AM",
  reportingInterval: "Every 5 minutes",
  logLevel: "INFO",
  quarantinePath: "C:\\Quarantine\\",
  maxLogSize: "100 MB"
};

const getCVSSLabel = (score: number): string => {
  if (score >= 9.0) return "Critical";
  if (score >= 7.0) return "High";
  if (score >= 4.0) return "Medium";
  return "Low";
};

const getCVSSBadge = (score: number): JSX.Element => {
  const label = getCVSSLabel(score);
  const colorMap: Record<string, string> = {
    Critical: "bg-red-700 text-white",
    High: "bg-red-500 text-white",
    Medium: "bg-yellow-400 text-black",
    Low: "bg-green-500 text-white",
  };
  return <Badge className={colorMap[label]}>{label}</Badge>;
};

const getLogLevelBadge = (level: Log['level']): JSX.Element => {
  const colorMap: Record<Log['level'], string> = {
    ERROR: "bg-red-500 text-white",
    WARNING: "bg-yellow-500 text-black",
    INFO: "bg-blue-500 text-white",
  };
  return <Badge className={`${colorMap[level]} text-xs`}>{level}</Badge>;
};

const tabs = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'logs', label: 'Device Logs', icon: FileText },
  { id: 'performance', label: 'Performance', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'actions', label: 'Actions', icon: Cpu }
];

export default function AgentDetailView() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isQuarantined, setIsQuarantined] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(mockSettings.autoUpdate);
  const [realTimeProtectionEnabled, setRealTimeProtectionEnabled] = useState(mockSettings.realTimeProtection);
  const [scheduledScanFrequency, setScheduledScanFrequency] = useState("Daily");
  const [scheduledScanTime, setScheduledScanTime] = useState("02:00");
  const [scheduledScanPeriod, setScheduledScanPeriod] = useState("AM");
  const [reportingInterval, setReportingInterval] = useState(mockSettings.reportingInterval);

  const handleQuarantine = () => {
    setIsQuarantined(!isQuarantined);
    console.log(isQuarantined ? 'Agent removed from quarantine' : 'Agent quarantined');
  };

  const handleRunScan = () => {
    setIsScanning(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="text-sm text-gray-600 italic">Overview tab under construction.</div>
        );
      case 'logs':
        return (
          <div className="text-sm text-gray-600 italic">Logs tab under construction.</div>
        );
      case 'performance':
        return (
          <div className="text-sm text-gray-600 italic">Performance tab under construction.</div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <ToggleSwitch
                  label="Auto Update"
                  description="Automatically update agent"
                  enabled={autoUpdateEnabled}
                  onToggle={() => setAutoUpdateEnabled(!autoUpdateEnabled)}
                />
                <ToggleSwitch
                  label="Real-time Protection"
                  description="Monitor threats in real-time"
                  enabled={realTimeProtectionEnabled}
                  onToggle={() => setRealTimeProtectionEnabled(!realTimeProtectionEnabled)}
                />
                <ScheduleScanSelector
                  frequency={scheduledScanFrequency}
                  time={scheduledScanTime}
                  period={scheduledScanPeriod}
                  onFrequencyChange={setScheduledScanFrequency}
                  onTimeChange={setScheduledScanTime}
                  onPeriodChange={setScheduledScanPeriod}
                />
                <ReportingIntervalSelector
                  value={reportingInterval}
                  onChange={setReportingInterval}
                />
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">Log Level</p>
                  <p className="text-sm text-gray-600">{mockSettings.logLevel}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">Quarantine Path</p>
                  <p className="text-sm text-gray-600 font-mono">{mockSettings.quarantinePath}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">Max Log Size</p>
                  <p className="text-sm text-gray-600">{mockSettings.maxLogSize}</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'actions':
        return (
          <div className="text-sm text-gray-600 italic">Actions tab under construction.</div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                {mockAgent.osIcon === "windows" && <span className="text-2xl">🪟</span>}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{mockAgent.name}</h1>
                <p className="text-gray-600">Agent ID: {mockAgent.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={mockAgent.status === "online" ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                <Activity className="w-3 h-3 mr-1" />
                {mockAgent.status.toUpperCase()}
              </Badge>
              {getCVSSBadge(mockAgent.cvss)}
              {isQuarantined && (
                <Badge className="bg-orange-500 text-white">
                  <Shield className="w-3 h-3 mr-1" />
                  QUARANTINED
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
