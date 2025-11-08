---
title: "Running GUI app via X11 from Docker Container"
slug: "run-gui-app-docker-xauth"
description: "Run applications with graphical interfaces from Docker using an X11 server."
date: "2025-09-24"
lastUpdated: "2025-09-24"
tags: ["linux", "docker", "devops"]
---

https://gursimarsm.medium.com/run-gui-applications-in-a-docker-container-ca625bad4638
https://janert.me/blog/2022/running-a-gui-application-in-a-docker-container2/

---

For Wayland, WIP:
```yml
services:
  waylandapp:
    image: wayland-app-demo   # build this below
    container_name: waylandapp
    environment:
      - WAYLAND_DISPLAY=${WAYLAND_DISPLAY}
      - XDG_RUNTIME_DIR=/tmp/xdg-runtime  # inside container
    volumes:
      - ${XDG_RUNTIME_DIR}/${WAYLAND_DISPLAY}:/tmp/xdg-runtime/${WAYLAND_DISPLAY}
    devices:
      - /dev/dri:/dev/dri   # GPU access (optional but recommended)
```

```dockerfile
FROM debian:stable-slim

RUN apt-get update && \
    apt-get install -y gedit libgtk-3-0 && \
    rm -rf /var/lib/apt/lists/*

CMD ["gedit"]
```

🔹 Notes & Gotchas

Permissions

By default, the Wayland socket is owned by your user (uid=1000).

If your container runs as root, it might be denied.

Fix: run the container as your user:

user: "${UID}:${GID}"


XWayland fallback

Some apps still speak X11, even on Wayland desktops.

In that case, you need the same X11 socket + xauth setup we discussed earlier.

Most modern GTK/Qt apps will speak Wayland natively.

GPU acceleration

Mount /dev/dri for Mesa/Intel/AMD.

For NVIDIA, you need the nvidia-container-toolkit.

Clipboard, input methods, portals

Wayland is stricter than X11. Some features (clipboard, file chooser portals) may require extra sockets (xdg-desktop-portal) or dbus mounts.