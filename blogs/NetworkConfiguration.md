---
title: "Network Configuration on Linux"
slug: "network-configuration-on-linux"
timeWritten: "2025-06-30 04:47:48"
lastUpdated: "2025-06-30 04:47:48"
---
# Network Configuration

## `iwd`
- Required for DHCP: `systemd-resolved` or `dhcpcd` (recommended)

## Connection
- Start the DHCPCD daemon from root
```sh
sudo systemctl enable dhcpcd.service
sudo systemctl start dhcpcd.service
# sudo dhcpcd
```

- Start the IWD service
```sh
sudo systemctl enable iwd.service
sudo systemctl start iwd.service
```

### 802.1x networks
- You must create a config file in `/var/lib/iwd/` that ends with "ssid.8021x"
- If the file has special character (dot, comman, at sign, etc.), the config file name must be hex encoded

# For example, wpa.mcgill.ca
# Encoding:
```sh
echo -n "wpa.mcgill.ca" | od -A n -t x1 | sed 's/ *//g'
# should return 7770612e6d6367696c6c2e6361
```

# Create a config file
sudo cd /var/lib/iwd/
sudo touch =7770612e6d6367696c6c2e6361.8021x
# Edit the file
```

- To configurate the network using EAP-PEAP and MsCHAPv2: (for example, as a McGill Student)
```
[Security]
EAP-Method=PEAP
EAP-Identity=anonymous
EAP-PEAP-Phase2-Method=MSCHAPV2
EAP-PEAP-Phase2-Identity=your.email@mail.mcgill.ca
EAP-PEAP-Phase2-Password=yourpassword

[Settings]
AutoConnect=true
```



