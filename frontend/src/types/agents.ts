// types/agent.ts
export type Agents = {
  id: string;
  name: string;
  ip: string;
  mac: string;
  os: string;
  osIcon: 'windows' | 'linux' | 'ubuntu';
  cvss: number;
  status: 'online' | 'offline' | 'maintenance';
  lastSeen: string;
  version: string;
  domain: string;
  uptime: string;
  cpu: string;
  memory: string;
  storage: string;
  location: string;
}