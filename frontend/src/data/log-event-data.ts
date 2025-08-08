// src/data/log-event-data.ts

import { LogEvent } from "@/types/log-event"

export const logEventData: LogEvent[] = [
  {
    id: "1749823059.2680",
    timestamp: "2025-06-13T13:57:39.028Z",
    agentName: "wazuh-server",
    ruleId: "80730",
    level: 3,
    description: "Auditd: SELinux permission check.",
    location: "/var/log/audit/audit.log",
    decoder: "auditd",
    fullLog:
      "type=AVC msg=audit(1749823058.859:227): avc:  denied  { getattr } for  pid=2413 comm=\"login\" path=\"/var/lib/update-motd/motd\" dev=\"sda1\" ino=34637123 scontext=system_u:system_r:local_login_t:s0-s0:c0.c1023 tcontext=system_u:object_r:var_lib_t:s0 tclass=file permissive=1",
    inputType: "log",
    groups: ["audit", "audit_selinux"],
    hipaa: ["164.312.b"],
    pci_dss: ["10.6.1"],
  },
]
