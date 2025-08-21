---
title: "Home Server as Bluetooth Speaker"
slug: "home-server-as-bluetooth-speaker"
timeWritten: "2025-08-20"
lastUpdated: "2025-08-20"
tags: []

---

Two machines: Server and Media Player

On Server: 
- Requires pipewire, wireplumber, bluez
- Related Resources:
    - [Bluetooth Class of Device Generator](https://bluetooth-pentest.narod.ru/software/bluetooth_class_of_device-service_generator.html)
- Edit `/etc/bluetooth/main.conf`:
```conf
[General]
# Turn server into a speaker
Class = 0x200428
AlwaysPairable = true
ControllerMode = dual # default

# optional but I did it anyways
Experimental = true
KernelExperimental = true
```

- Make sure wireplumber is up, and `wpctl status` can see that there's a sink.
- In case `wpctl status` shows no sink, plug in the audio output device and restart pipewire
```sh
systemctl restart --user pipewire.service
```

- Run `bluetoothctl` and set the following varibles:
```sh
bluetoothctl
[server] power on
[server] agent off
[server] agent NoInputNoOutput
[server] pairable on
[server] discoverable on
```

- Now, on media player device, connect to the bluetooth server. It will show the device as a speaker.