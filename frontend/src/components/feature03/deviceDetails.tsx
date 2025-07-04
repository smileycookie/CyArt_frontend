"use client"
import React, { JSX, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Play, AlertTriangle, Activity, Network, HardDrive, Cpu, Calendar, Clock, Info, Settings, BarChart3, FileText } from 'lucide-react';


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

const mockPerformanceData = [
  { time: "14:00", cpu: 45, memory: 62, disk: 23 },
  { time: "16:00", cpu: 52, memory: 58, disk: 25 },
  { time: "18:00", cpu: 38, memory: 64, disk: 22 },
  { time: "19:00", cpu: 67, memory: 61, disk: 28 },
  { time: "21:00", cpu: 43, memory: 59, disk: 24 },
  { time: "23:00", cpu: 55, memory: 63, disk: 26 },
  { time: "01:00", cpu: 48, memory: 60, disk: 23 }
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
    
    console.log('Starting security scan...');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Agent Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">IP Address</label>
                  <p className="text-sm text-gray-900 font-mono">{mockAgent.ip}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">MAC Address</label>
                  <p className="text-sm text-gray-900 font-mono">{mockAgent.mac}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Operating System</label>
                  <p className="text-sm text-gray-900">{mockAgent.os}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Domain</label>
                  <p className="text-sm text-gray-900">{mockAgent.domain}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Agent Version</label>
                  <p className="text-sm text-gray-900">{mockAgent.version}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Uptime</label>
                  <p className="text-sm text-gray-900">{mockAgent.uptime}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">CPU</label>
                  <p className="text-sm text-gray-900">{mockAgent.cpu}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Memory</label>
                  <p className="text-sm text-gray-900">{mockAgent.memory}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Storage</label>
                  <p className="text-sm text-gray-900">{mockAgent.storage}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <p className="text-sm text-gray-900">{mockAgent.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Seen</label>
                  <p className="text-sm text-gray-900">{mockAgent.lastSeen}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">CVSS Score</label>
                  <p className="text-sm text-gray-900">{mockAgent.cvss}/10</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'logs':
        return (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {mockLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {getLogLevelBadge(log.level)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <Clock className="w-3 h-3" />
                    <span>{log.timestamp}</span>
                    <span className="text-gray-300">•</span>
                    <span>{log.source}</span>
                  </div>
                  <p className="text-sm text-gray-900">{log.message}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600">CPU Usage</p>
                    <p className="text-2xl font-bold text-blue-800">48%</p>
                  </div>
                  <Cpu className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600">Memory Usage</p>
                    <p className="text-2xl font-bold text-green-800">60%</p>
                  </div>
                  <HardDrive className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600">Disk Usage</p>
                    <p className="text-2xl font-bold text-purple-800">23%</p>
                  </div>
                  <HardDrive className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-4">Performance History (Last 12 hours)</h3>
              <div className="space-y-3">
                {mockPerformanceData.map((data, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-sm text-gray-500 w-12">{data.time}</span>
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>CPU</span>
                          <span>{data.cpu}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${data.cpu}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Memory</span>
                          <span>{data.memory}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${data.memory}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Disk</span>
                          <span>{data.disk}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${data.disk}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Auto Update</p>
                    <p className="text-sm text-gray-600">Automatically update agent</p>
                  </div>
                  <Badge className={mockSettings.autoUpdate ? "bg-green-500" : "bg-gray-500"}>
                    {mockSettings.autoUpdate ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Real-time Protection</p>
                    <p className="text-sm text-gray-600">Monitor threats in real-time</p>
                  </div>
                  <Badge className={mockSettings.realTimeProtection ? "bg-green-500" : "bg-gray-500"}>
                    {mockSettings.realTimeProtection ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">Scheduled Scan</p>
                  <p className="text-sm text-gray-600">{mockSettings.scheduledScan}</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">Reporting Interval</p>
                  <p className="text-sm text-gray-600">{mockSettings.reportingInterval}</p>
                </div>
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
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={handleQuarantine}
                variant={isQuarantined ? "outline" : "default"}
                className={isQuarantined ? "border-orange-500 text-orange-600 hover:bg-orange-50" : "bg-orange-500 hover:bg-orange-600"}
              >
                <Shield className="w-4 h-4 mr-2" />
                {isQuarantined ? "Remove from Quarantine" : "Quarantine Agent"}
              </Button>
              
              <Button
                onClick={handleRunScan}
                disabled={isScanning}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Play className="w-4 h-4 mr-2" />
                {isScanning ? "Scanning..." : "Run Security Scan"}
              </Button>
              
              {isScanning && (
                <div className="flex items-center gap-3 ml-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min(scanProgress, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{Math.round(scanProgress)}%</span>
                </div>
              )}
            </div>
            
            {scanProgress === 100 && !isScanning && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">Scan completed successfully!</span>
                </div>
                <p className="text-green-700 text-sm mt-1">No threats detected. System is secure.</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="w-4 h-4 mr-2" />
                    Restart Agent Service
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <HardDrive className="w-4 h-4 mr-2" />
                    Clear Cache
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Export Logs
                  </Button>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Advanced Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Update Configuration
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Network className="w-4 h-4 mr-2" />
                    Test Connectivity
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Force Uninstall
                  </Button>
                </div>
              </div>
            </div>
          </div>
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
                {mockAgent.osIcon === "linux" && <span className="text-2xl">🐧</span>}
                {mockAgent.osIcon === "ubuntu" && <span className="text-2xl">🟠</span>}
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

        {/* Tabs Navigation */}
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