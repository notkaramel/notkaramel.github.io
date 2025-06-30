---
title: "Recovery Guide"
slug: "recovery-guide"
timeWritten: "2025-06-30 04:34:28"
lastUpdated: "2025-06-30 04:34:28"
---
# Recovery

Sometimes, things don't go as you expect them to be. How to solve it? Preferably not to reinstall the entire operating system (and cry in pain).

## Back to Windows
It's the easiest fallback for dual boot systems

## Kernel/Boot time errors

### GRUB options for root terminal
- On the GRUB boot screen, do:
  - Press 'A', for on Minegrub theme: Press `C for console options`
  - Edit the line of kernel loading and add `init=/bin/bash`
- Resolve the problem from the root terminal

### 
