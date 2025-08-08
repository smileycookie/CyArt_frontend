"use client"
import React, { JSX, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from "@/components/ui/switch";
import { Shield, Play, AlertTriangle, Activity, Network, HardDrive, Cpu, Calendar, Clock, Info, Settings, BarChart3, FileText } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  ip: string;
  mac: string;
  os: string;
  osIcon: string;
  cvss: number;
  status: string;
  lastSeen: string;
  version: string;
  domain: string;
  uptime: string;
  cpu: string;
  memory: string;
  storage: string;
  location: string;
}

interface Log {
  id: number;
  timestamp: string;
  level: 'ERROR' | 'WARNING' | 'INFO';
  message: string;
  source: string;
}

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

const getCVSSLabel = (score: number): 'Critical' | 'High' | 'Medium' | 'Low' => {
  if (score >= 9.0) return "Critical";
  if (score >= 7.0) return "High";
  if (score >= 4.0) return "Medium";
  return "Low";
};  

const getCVSSBadge = (score: number): JSX.Element => {
  const label = getCVSSLabel(score);
  const colorMap: Record<'Critical' | 'High' | 'Medium' | 'Low', string> = {
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
];

interface AgentDetailViewProps {
  agent?: Agent; 
}

export default function AgentDetailView({ agent = {
  id: "AGT-001",
  name: "DESKTOP-ABC123",
  ip: "192.168.1.100",
  mac: "00:1B:44:11:3A:B7",
  os: "Windows 11 Pro",
  osIcon: "windows",
  cvss: 7.5,
  status: "Online",
  lastSeen: "2025-07-02 14:30:22",
  version: "Agent v2.1.4",
  domain: "CORPORATE",
  uptime: "7 days, 14 hours",
  cpu: "Intel Core i7-12700K",
  memory: "16 GB DDR4",
  storage: "512 GB SSD",
  location: "Building A, Floor 3"
} }: AgentDetailViewProps)  {
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
                  <p className="text-sm text-gray-900 font-mono">{agent.ip}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">MAC Address</label>
                  <p className="text-sm text-gray-900 font-mono">{agent.mac}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Operating System</label>
                  <p className="text-sm text-gray-900">{agent.os}</p>
                </div>
              </div>
           <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Domain</label>
                  <p className="text-sm text-gray-900">{agent.domain}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Agent Version</label>
                  <p className="text-sm text-gray-900">{agent.version}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Uptime</label>
                  <p className="text-sm text-gray-900">{agent.uptime}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">CPU</label>
                  <p className="text-sm text-gray-900">{agent.cpu}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Memory</label>
                  <p className="text-sm text-gray-900">{agent.memory}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Storage</label>
                  <p className="text-sm text-gray-900">{agent.storage}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <p className="text-sm text-gray-900">{agent.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Seen</label>
                  <p className="text-sm text-gray-900">{agent.lastSeen}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">CVSS Score</label>
                  <p className="text-sm text-gray-900">{agent.cvss}/10</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Quick Actions</h3>
                <div className="space-y-2">
                   <Button variant="outline" className="w-full justify-start">
                    <HardDrive className="w-4 h-4 mr-2" />
                    Clear Cache
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="w-4 h-4 mr-2" />
                    Restart Agent Service
                  </Button>
                  
                  <Button variant={isScanning ? "default" : "outline"}
                onClick={handleRunScan}
                disabled={isScanning}
                className="w-full justify-start"
              >
                <Play className="w-4 h-4 mr-2" />
                {isScanning ? "Scanning..." : "Run Security Scan"}
              </Button>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Advanced Actions</h3>
                <div className="space-y-2">
                  <Button
                onClick={handleQuarantine}
                variant={isQuarantined ? "default" : "outline"}
                className="w-full justify-start"
              >
                <Shield className="w-4 h-4 mr-2" />
                {isQuarantined ? "Remove from Quarantine" : "Quarantine Agent"}
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
              <h3 className="font-medium mb-4">Performance History (Last 24 hours)</h3>
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
          {/* Auto Update with Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Auto Update</p>
              <p className="text-sm text-gray-600">Automatically update agent</p>
            </div>
            <Switch
              checked={mockSettings.autoUpdate}
              onCheckedChange={(checked) => {
                // In a real app, you would update the state here
                console.log(`Auto Update ${checked ? 'enabled' : 'disabled'}`);
              }}
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200"
            />
          </div>
          
          {/* Real-time Protection with Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Real-time Protection</p>
              <p className="text-sm text-gray-600">Monitor threats in real-time</p>
            </div>
            <Switch
              checked={mockSettings.realTimeProtection}
              onCheckedChange={(checked) => {
                // In a real app, you would update the state here
                console.log(`Real-time Protection ${checked ? 'enabled' : 'disabled'}`);
              }}
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200"
            />
          </div>
          
          {/* Scheduled Scan with Time Picker */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Scheduled Scan</p>
                <p className="text-sm text-gray-600">Set time for daily scan</p>
              </div>
              <div className="flex items-center gap-2">
                <select 
                  className="bg-white border rounded-md px-2 py-1 text-sm"
                  defaultValue="Daily"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
                <input
                  type="time"
                  defaultValue="02:00"
                  className="bg-white border rounded-md px-2 py-1 text-sm"
                  onChange={(e) => {
                    console.log(`Scheduled scan time set to ${e.target.value}`);
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Reporting Interval */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Reporting Interval</p>
                <p className="text-sm text-gray-600">How often to send reports</p>
              </div>
              <select 
                className="bg-white border rounded-md px-2 py-1 text-sm"
                defaultValue="5"
                onChange={(e) => {
                  const intervals = {
                    '0': 'Real-time',
                    '1': 'Every 1 minute',
                    '5': 'Every 5 minutes',
                    '15': 'Every 15 minutes',
                    '30': 'Every 30 minutes',
                    '60': 'Every 1 hour'
                  };
                  console.log(`Reporting interval set to ${intervals[e.target.value as keyof typeof intervals] || 'Unknown interval'}`);
                }}
              >
                <option value="0">Real-time</option>
                <option value="1">Every 1 minute</option>
                <option value="5">Every 5 minutes</option>
                <option value="15">Every 15 minutes</option>
                <option value="30">Every 30 minutes</option>
                <option value="60">Every 1 hour</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Log Level */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Log Level</p>
                <p className="text-sm text-gray-600">Set verbosity of logs</p>
              </div>
              <select 
                className="bg-white border rounded-md px-2 py-1 text-sm"
                defaultValue="INFO"
                onChange={(e) => {
                  console.log(`Log level set to ${e.target.value}`);
                }}
              >
                <option value="DEBUG">DEBUG</option>
                <option value="INFO">INFO</option>
                <option value="WARNING">WARNING</option>
                <option value="ERROR">ERROR</option>
              </select>
            </div>
          </div>
          
          {/* Quarantine Path */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Quarantine Path</p>
                <p className="text-sm text-gray-600 font-mono">{mockSettings.quarantinePath}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => {
                // In a real app, this would open a file picker
                console.log('Change quarantine path clicked');
              }}>
                Change
              </Button>
            </div>
          </div>
          
          {/* Max Log Size */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Max Log Size</p>
                <p className="text-sm text-gray-600">Maximum size for log files</p>
              </div>
              <select 
                className="bg-white border rounded-md px-2 py-1 text-sm"
                defaultValue="100"
                onChange={(e) => {
                  console.log(`Max log size set to ${e.target.value} MB`);
                }}
              >
                <option value="50">50 MB</option>
                <option value="100">100 MB</option>
                <option value="250">250 MB</option>
                <option value="500">500 MB</option>
              </select>
            </div>
          </div>
          
          {/* Save Settings Button */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                // In a real app, this would save all settings
                console.log('Settings saved');
              }}
            >
              Save Settings
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
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                {agent.osIcon === "windows" && <span className="text-2xl">🪟</span>}
                {agent.osIcon === "linux" && <span className="text-2xl">🐧</span>}
                {agent.osIcon === "ubuntu" && <span className="text-2xl">🟠</span>}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{agent.name}</h1>
                <p className="text-gray-600">Agent ID: {agent.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={agent.status === "Online" ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                {agent.status}
              </Badge>
              
              {getCVSSBadge(agent.cvss)}
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