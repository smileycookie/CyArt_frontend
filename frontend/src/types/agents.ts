export interface Agent {
  id: string
  name: string
  ip: string
  mac: string
  os: string
  osIcon: "windows" | "ubuntu" | "linux"
  cvss: number
  status: "Online" | "Offline"   // ✅ Add this line
}